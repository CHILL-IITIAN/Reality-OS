import { motion } from 'framer-motion';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { trajectoryInsights, generateWeeklyTrend } from '../data/mockData';

const weeklyData = generateWeeklyTrend();

const CustomTooltipDark = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(8,8,10,0.96)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 11,
        fontFamily: 'Space Mono, monospace',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 6, fontSize: 9 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, marginBottom: 2 }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const radarData = [
  { subject: 'Consistency', value: 72, fullMark: 100 },
  { subject: 'Focus', value: 68, fullMark: 100 },
  { subject: 'Alignment', value: 55, fullMark: 100 },
  { subject: 'Recovery', value: 81, fullMark: 100 },
  { subject: 'Depth', value: 63, fullMark: 100 },
  { subject: 'Clarity', value: 74, fullMark: 100 },
];

const insightTypeConfig = {
  improving: { color: 'rgba(109,255,184,0.7)', icon: '↑', bg: 'rgba(109,255,184,0.07)' },
  warning: { color: 'rgba(255,180,80,0.7)', icon: '⚠', bg: 'rgba(255,180,80,0.07)' },
  neutral: { color: 'rgba(120,200,255,0.6)', icon: '→', bg: 'rgba(120,200,255,0.06)' },
};

const cycles = [
  { label: 'Momentum Build', days: '1–7', status: 'complete', desc: 'Baseline established. Consistency forming.' },
  { label: 'Friction Peak', days: '8–12', status: 'complete', desc: 'Highest resistance. Most drop-offs occur here.' },
  { label: 'Adaptation Window', days: '13–21', status: 'active', desc: 'Neural pattern reinforcement. Critical phase.' },
  { label: 'Integration', days: '22–30', status: 'pending', desc: 'Behavior becomes identity. Sustainable mode.' },
];

const Panel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 12,
      padding: '26px 26px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </motion.div>
);

export default function Trajectory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ padding: '88px 32px 48px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 40 }}
      >
        <div style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Mono, monospace' }}>
          Long-Term Engine
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 100, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Behavioral Trajectory
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
          Where this path leads, if unchanged.
        </p>

        {/* Projection statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 20,
            padding: '14px 20px',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            maxWidth: 680,
          }}
        >
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'rgba(109,255,184,0.7)',
            boxShadow: '0 0 8px rgba(109,255,184,0.5)',
            flexShrink: 0,
          }} className="pulse-glow" />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontStyle: 'italic' }}>
            "If current behavioral patterns hold for 30 more days, focus stability is projected to improve by 18–24%. 
            Distraction dependency shows early reversal signals."
          </p>
        </motion.div>
      </motion.div>

      {/* Trajectory insights */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Space Mono, monospace' }}>
          Active Observations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {trajectoryInsights.map((insight, i) => {
            const cfg = insightTypeConfig[insight.type as keyof typeof insightTypeConfig];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.color}20`,
                  borderRadius: 10,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 14, color: cfg.color, flexShrink: 0, width: 20, textAlign: 'center' }}>
                  {cfg.icon}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                    {insight.text}
                  </span>
                </div>
                <span style={{
                  fontSize: 10,
                  color: cfg.color,
                  fontFamily: 'Space Mono, monospace',
                  opacity: 0.7,
                  flexShrink: 0,
                  padding: '3px 10px',
                  background: `${cfg.color}10`,
                  borderRadius: 4,
                  border: `1px solid ${cfg.color}20`,
                }}>
                  {insight.detail}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
        <Panel delay={0.25}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(120,200,255,0.2), transparent)' }} />
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Space Mono, monospace' }}>
              12-Week Projection
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}>Multi-Signal Trajectory</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="focusTraj" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(120,200,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(120,200,255,0.01)" />
                </linearGradient>
                <linearGradient id="alignTraj" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(109,255,184,0.15)" />
                  <stop offset="100%" stopColor="rgba(109,255,184,0.01)" />
                </linearGradient>
                <linearGradient id="deepTraj" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(180,140,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(180,140,255,0.01)" />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.15)', fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltipDark />} />
              <Area type="monotone" dataKey="focus" name="Focus" stroke="rgba(120,200,255,0.5)" strokeWidth={1.5} fill="url(#focusTraj)" dot={false} />
              <Area type="monotone" dataKey="alignment" name="Alignment" stroke="rgba(109,255,184,0.45)" strokeWidth={1.5} fill="url(#alignTraj)" dot={false} />
              <Area type="monotone" dataKey="deepWork" name="Deep Work" stroke="rgba(180,140,255,0.4)" strokeWidth={1.5} fill="url(#deepTraj)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {[
              { color: 'rgba(120,200,255,0.6)', label: 'FOCUS' },
              { color: 'rgba(109,255,184,0.55)', label: 'ALIGNMENT' },
              { color: 'rgba(180,140,255,0.5)', label: 'DEEP WORK' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 1.5, background: item.color }} />
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel delay={0.32}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,140,255,0.2), transparent)' }} />
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>
              Behavioral Radar
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.75)' }}>Signal Profile</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.2)', fontFamily: 'Space Mono' }}
              />
              <Radar
                name="You"
                dataKey="value"
                stroke="rgba(180,140,255,0.6)"
                fill="rgba(180,140,255,0.08)"
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Behavioral cycle */}
      <Panel delay={0.4}>
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,180,80,0.2), transparent)' }} />
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Space Mono, monospace' }}>
            30-Day Behavioral Cycle
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}>Pattern Architecture</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {cycles.map((cycle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
              style={{
                background: cycle.status === 'active' ? 'rgba(255,180,80,0.05)' : cycle.status === 'complete' ? 'rgba(109,255,184,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${cycle.status === 'active' ? 'rgba(255,180,80,0.2)' : cycle.status === 'complete' ? 'rgba(109,255,184,0.12)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: 10,
                padding: '16px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.15)' }}>
                  DAY {cycle.days}
                </div>
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: cycle.status === 'active' ? 'rgba(255,180,80,0.7)' : cycle.status === 'complete' ? 'rgba(109,255,184,0.6)' : 'rgba(255,255,255,0.12)',
                  boxShadow: cycle.status === 'active' ? '0 0 8px rgba(255,180,80,0.5)' : cycle.status === 'complete' ? '0 0 6px rgba(109,255,184,0.4)' : 'none',
                }} className={cycle.status === 'active' ? 'pulse-glow' : ''} />
              </div>
              <div style={{ fontSize: 12, color: cycle.status === 'pending' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.7)', fontWeight: 400, marginBottom: 6, letterSpacing: '0.01em' }}>
                {cycle.label}
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', lineHeight: 1.6 }}>
                {cycle.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Mono, monospace' }}>Cycle progress</span>
            <span style={{ fontSize: 10, color: 'rgba(255,180,80,0.6)', fontFamily: 'Space Mono, monospace' }}>Day 15 / 30</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, rgba(109,255,184,0.5), rgba(255,180,80,0.6))',
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(255,180,80,0.3)',
              }}
            />
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}
