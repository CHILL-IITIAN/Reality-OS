import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  ResponsiveContainer, Tooltip, XAxis, CartesianGrid
} from 'recharts';
import { generateWeeklyTrend, generateDailyPattern } from '../data/mockData';

const weeklyData = generateWeeklyTrend();
const dailyPattern = generateDailyPattern();

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

const SectionHeader = ({ label, title, sub }: { label: string; title: string; sub?: string }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Space Mono, monospace' }}>
      {label}
    </div>
    <h3 style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.82)', marginBottom: 4 }}>{title}</h3>
    {sub && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{sub}</p>}
  </div>
);

const Panel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 12,
      padding: '28px 26px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </motion.div>
);

export default function Analytics() {
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
          Reality Analytics
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 100, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Pattern Intelligence
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
          12-week behavioral analysis. Patterns encoded.
        </p>
      </motion.div>

      {/* Row 1: Focus trend + Daily pattern */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Panel delay={0.1}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(120,200,255,0.2), transparent)' }} />
          <SectionHeader label="12-Week Trend" title="Focus vs Distraction" sub="Measured in behavioral signal units" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(120,200,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(120,200,255,0.02)" />
                </linearGradient>
                <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,107,107,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,107,107,0.02)" />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.15)', fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltipDark />} />
              <Area type="monotone" dataKey="focus" name="Focus" stroke="rgba(120,200,255,0.6)" strokeWidth={1.5} fill="url(#focusGrad)" dot={false} />
              <Area type="monotone" dataKey="distraction" name="Distraction" stroke="rgba(255,107,107,0.5)" strokeWidth={1.5} fill="url(#distGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 1.5, background: 'rgba(120,200,255,0.6)' }} />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>FOCUS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 1.5, background: 'rgba(255,107,107,0.5)' }} />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>DISTRACTION</span>
            </div>
          </div>
        </Panel>

        <Panel delay={0.18}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,140,255,0.2), transparent)' }} />
          <SectionHeader label="Circadian Analysis" title="Hourly Focus Pattern" sub="Average attention density by hour" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyPattern.filter((_, i) => i % 1 === 0)}>
              <XAxis dataKey="hour" tick={{ fontSize: 7, fill: 'rgba(255,255,255,0.12)', fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} interval={3} />
              <Tooltip content={<CustomTooltipDark />} />
              <Bar dataKey="focus" name="Focus" fill="rgba(180,140,255,0.4)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 10, lineHeight: 1.6 }}>
            Peak cognitive window: <span style={{ color: 'rgba(180,140,255,0.7)' }}>9am – 11am</span>. Secondary rise at 3pm.
          </p>
        </Panel>
      </div>

      {/* Row 2: Deep work + Alignment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Panel delay={0.26}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(109,255,184,0.2), transparent)' }} />
          <SectionHeader label="Depth Tracking" title="Deep Work Duration" sub="Hours of uninterrupted focus per week" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.15)', fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltipDark />} />
              <Bar dataKey="deepWork" name="Deep Work" fill="rgba(109,255,184,0.35)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel delay={0.34}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,180,80,0.2), transparent)' }} />
          <SectionHeader label="Alignment Index" title="Action–Goal Coherence" sub="Weekly intention vs execution delta" />
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="week" tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.15)', fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
              <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
              <Tooltip content={<CustomTooltipDark />} />
              <Line type="monotone" dataKey="alignment" name="Alignment" stroke="rgba(255,180,80,0.7)" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: 'rgba(255,180,80,0.9)', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Row 3: Insight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          {
            label: 'Consistency Pattern',
            value: '68%',
            insight: 'Your most consistent period was weeks 9-11. Behavioral regularity increased by 23% during that window.',
            color: 'rgba(120,200,255,0.6)',
            delay: 0.42,
          },
          {
            label: 'Avoidance Index',
            value: '28%',
            insight: 'Avoidance spikes precede your highest-value tasks. The resistance lasts 12–18 minutes on average before resolution.',
            color: 'rgba(255,107,107,0.6)',
            delay: 0.5,
          },
          {
            label: 'Recovery Rate',
            value: '2.1 days',
            insight: 'After disruption events, full behavioral recovery takes ~2 days. Your fastest recoveries follow reflection-logged evenings.',
            color: 'rgba(109,255,184,0.6)',
            delay: 0.58,
          },
        ].map(item => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: '22px 22px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${item.color}30, transparent)` }} />
            <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Mono, monospace' }}>
              {item.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 200, color: item.color, marginBottom: 14, letterSpacing: '-0.01em' }}>
              {item.value}
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              {item.insight}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
