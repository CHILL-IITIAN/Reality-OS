import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis
} from 'recharts';
import BehaviorHeatmap from '../components/BehaviorHeatmap';
import RealityCheck from '../components/RealityCheck';
import MetricCard from '../components/MetricCard';
import DriftGauge from '../components/DriftGauge';
import { DayData, generateMomentumData } from '../data/mockData';

interface DashboardProps {
  heatmapData: DayData[];
}

const momentumData = generateMomentumData();

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(10,10,12,0.95)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Space Mono, monospace',
      }}>
        {payload[0].value}%
      </div>
    );
  }
  return null;
};

export default function Dashboard({ heatmapData }: DashboardProps) {
  const today = format(new Date(), 'EEEE, MMMM d');
  const currentMomentum = momentumData[momentumData.length - 1].momentum;
  const prevMomentum = momentumData[momentumData.length - 7].momentum;
  const momentumTrend = currentMomentum > prevMomentum ? 'up' : 'down';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ padding: '88px 32px 48px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{
          fontSize: 10,
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.18)',
          textTransform: 'uppercase',
          marginBottom: 10,
          fontFamily: 'Space Mono, monospace',
        }}>
          {today}
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 100,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.2,
          marginBottom: 8,
        }}>
          Behavioral Observatory
        </h1>
        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.25)',
          fontWeight: 300,
          letterSpacing: '0.03em',
        }}>
          Your patterns observed. Your trajectory measured.
        </p>

        {/* Context strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            marginTop: 24,
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          {[
            { text: 'Day 15 of current cycle', color: 'rgba(255,180,80,0.5)', bg: 'rgba(255,180,80,0.06)' },
            { text: 'Drift: Low (22/100)', color: 'rgba(109,255,184,0.5)', bg: 'rgba(109,255,184,0.06)' },
            { text: 'Last deep focus: 2.4h ago', color: 'rgba(120,200,255,0.45)', bg: 'rgba(120,200,255,0.05)' },
            { text: 'Alignment trending up', color: 'rgba(180,140,255,0.5)', bg: 'rgba(180,140,255,0.06)' },
          ].map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                background: tag.bg,
                border: `1px solid ${tag.color}30`,
                fontSize: 10,
                color: tag.color,
                letterSpacing: '0.04em',
              }}
            >
              {tag.text}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Metrics row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
        marginBottom: 32,
      }}>
        <MetricCard
          label="Momentum Index"
          value={`${currentMomentum}%`}
          sub="Current trajectory"
          trend={momentumTrend}
          trendValue={`${Math.abs(currentMomentum - prevMomentum)}%`}
          accentColor="rgba(120,200,255,0.6)"
          delay={0.1}
        />
        <MetricCard
          label="Focus Stability"
          value="73%"
          sub="7-day average"
          trend="up"
          trendValue="8%"
          accentColor="rgba(109,255,184,0.6)"
          delay={0.18}
        />
        <MetricCard
          label="Drift Level"
          value="Low"
          sub="3 days clean"
          trend="down"
          trendValue="12%"
          accentColor="rgba(255,107,107,0.5)"
          delay={0.26}
        />
        <MetricCard
          label="Alignment Score"
          value="61%"
          sub="Action vs intention"
          trend="neutral"
          trendValue="stable"
          accentColor="rgba(180,140,255,0.6)"
          delay={0.34}
        />
        <MetricCard
          label="Deep Work"
          value="3.2h"
          sub="Today's total"
          trend="up"
          trendValue="0.4h"
          accentColor="rgba(255,180,80,0.6)"
          delay={0.42}
        />
      </div>

      {/* Momentum chart + Reality check */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(200px, 1fr, 800px) minmax(280px, 360px)',
        gap: 16,
        marginBottom: 24,
      }}>
        {/* Momentum chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: '24px 24px 16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(120,200,255,0.2), transparent)',
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>
                30-Day Window
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}>
                Momentum Trajectory
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, fontWeight: 200, color: 'rgba(120,200,255,0.9)' }}>
                {currentMomentum}%
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em' }}>
                current
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={momentumData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="momentumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(120,200,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(120,200,255,0)" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.15)', fontFamily: 'Space Mono' }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="momentum"
                stroke="rgba(120,200,255,0.5)"
                strokeWidth={1.5}
                fill="url(#momentumGrad)"
                dot={false}
                activeDot={{ r: 3, fill: 'rgba(120,200,255,0.8)', strokeWidth: 0 }}
              />
              {/* Threshold line */}
              <Area
                type="monotone"
                dataKey="threshold"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
                strokeDasharray="4 4"
                fill="none"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reality check */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <RealityCheck />

          {/* Drift gauge + Quick status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <DriftGauge value={22} label="Drift Index" />

            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: '18px 16px',
            }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Space Mono, monospace' }}>
                Signals
              </div>
              {[
                { label: 'Consistency', value: 68, color: 'rgba(109,255,184,0.6)' },
                { label: 'Focus', value: 72, color: 'rgba(120,200,255,0.6)' },
                { label: 'Alignment', value: 55, color: 'rgba(180,140,255,0.6)' },
                { label: 'Avoidance', value: 28, color: 'rgba(255,107,107,0.6)' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 9 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>{item.label}</span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', fontFamily: 'Space Mono, monospace' }}>{item.value}%</span>
                  </div>
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 1 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: item.color,
                        borderRadius: 1,
                        boxShadow: `0 0 6px ${item.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '28px 28px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          right: '5%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(109,255,184,0.15), transparent)',
        }} />
        <BehaviorHeatmap data={heatmapData} />
      </motion.div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ textAlign: 'center', padding: '40px 0 12px' }}
      >
        <p style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.12)',
          fontStyle: 'italic',
          fontWeight: 300,
          letterSpacing: '0.05em',
        }}>
          Every pattern observed is a pattern that can be changed.
        </p>
      </motion.div>
    </motion.div>
  );
}
