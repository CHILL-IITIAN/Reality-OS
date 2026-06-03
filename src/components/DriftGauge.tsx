import { motion } from 'framer-motion';

interface DriftGaugeProps {
  value: number; // 0-100, higher = more drift
  label?: string;
}

export default function DriftGauge({ value, label = 'Drift Index' }: DriftGaugeProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference * 0.75;
  const startAngle = 135;

  const getColor = (v: number) => {
    if (v < 25) return 'rgba(109,255,184,0.7)';
    if (v < 50) return 'rgba(120,200,255,0.7)';
    if (v < 75) return 'rgba(255,180,80,0.7)';
    return 'rgba(255,107,107,0.7)';
  };

  const getLabel = (v: number) => {
    if (v < 25) return 'Anchored';
    if (v < 50) return 'Mild Drift';
    if (v < 75) return 'Drifting';
    return 'High Drift';
  };

  const color = getColor(value);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 12,
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }} />

      <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Space Mono, monospace', alignSelf: 'flex-start' }}>
        {label}
      </div>

      {/* SVG Gauge */}
      <div style={{ position: 'relative', width: 140, height: 80, overflow: 'hidden' }}>
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Background arc */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="6"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={circumference * 0.125}
            strokeLinecap="round"
            transform={`rotate(${startAngle} 70 70)`}
          />
          {/* Value arc */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(${startAngle} 70 70)`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>

        {/* Center value */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: 26,
              fontWeight: 200,
              color: color,
              lineHeight: 1,
              textShadow: `0 0 20px ${color}`,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {value}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: 8,
          fontSize: 11,
          color: color,
          letterSpacing: '0.08em',
          fontWeight: 300,
        }}
      >
        {getLabel(value)}
      </motion.div>

      {/* Mini indicators */}
      <div style={{ display: 'flex', gap: 4, marginTop: 14, width: '100%' }}>
        {['Low', 'Mid', 'High', 'Peak'].map((seg, i) => (
          <div
            key={seg}
            style={{
              flex: 1,
              height: 2,
              borderRadius: 1,
              background: value > i * 25 
                ? i === 0 ? 'rgba(109,255,184,0.5)' 
                : i === 1 ? 'rgba(120,200,255,0.5)' 
                : i === 2 ? 'rgba(255,180,80,0.5)' 
                : 'rgba(255,107,107,0.5)'
                : 'rgba(255,255,255,0.05)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
