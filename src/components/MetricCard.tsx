import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  accentColor?: string;
  icon?: ReactNode;
  delay?: number;
}

export default function MetricCard({
  label,
  value,
  sub,
  trend,
  trendValue,
  accentColor = 'rgba(120,200,255,0.6)',
  delay = 0,
}: MetricCardProps) {
  const trendColor = trend === 'up' ? '#6DFFB8' : trend === 'down' ? '#FF6B6B' : 'rgba(255,255,255,0.3)';
  const trendSymbol = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      style={{
        background: 'rgba(255,255,255,0.022)',
        border: '1px solid rgba(255,255,255,0.055)',
        borderRadius: 12,
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${accentColor}10`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.055)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
      }} />

      <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Space Mono, monospace' }}>
        {label}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 200,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1,
            marginBottom: 6,
            letterSpacing: '-0.01em',
          }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
              {sub}
            </div>
          )}
        </div>
        {trend && trendValue && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            padding: '4px 8px',
            borderRadius: 5,
            background: `${trendColor}10`,
            border: `1px solid ${trendColor}20`,
          }}>
            <span style={{ fontSize: 10, color: trendColor }}>{trendSymbol}</span>
            <span style={{ fontSize: 10, color: trendColor, fontFamily: 'Space Mono, monospace' }}>{trendValue}</span>
          </div>
        )}
      </div>

      {/* Mini bar */}
      <div style={{ marginTop: 14, height: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 1 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.random() * 40 + 40}%` }}
          transition={{ duration: 1.2, delay: delay + 0.4, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${accentColor}50, ${accentColor}20)`,
            borderRadius: 1,
          }}
        />
      </div>
    </motion.div>
  );
}
