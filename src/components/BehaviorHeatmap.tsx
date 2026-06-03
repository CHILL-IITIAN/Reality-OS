import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, startOfMonth, getDay, getDaysInMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { DayData, DayQuality } from '../data/mockData';

interface BehaviorHeatmapProps {
  data: DayData[];
}

const qualityConfig: Record<DayQuality, { color: string; label: string; glow: string }> = {
  'deep-focus': { color: '#78C8FF', label: 'Deep Focus', glow: 'rgba(120,200,255,0.4)' },
  'aligned': { color: '#6DFFB8', label: 'Aligned', glow: 'rgba(109,255,184,0.35)' },
  'recovery': { color: '#B48CFF', label: 'Recovery', glow: 'rgba(180,140,255,0.3)' },
  'distracted': { color: '#FFB450', label: 'Distracted', glow: 'rgba(255,180,80,0.3)' },
  'drift': { color: '#FF6B6B', label: 'Drift', glow: 'rgba(255,107,107,0.3)' },
  'inactive': { color: 'rgba(255,255,255,0.06)', label: 'Inactive', glow: 'transparent' },
  'empty': { color: 'rgba(255,255,255,0.03)', label: '', glow: 'transparent' },
};

interface TooltipData {
  day: DayData;
  x: number;
  y: number;
}

export default function BehaviorHeatmap({ data }: BehaviorHeatmapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const dataMap = useMemo(() => {
    const map: Record<string, DayData> = {};
    data.forEach(d => { map[d.date] = d; });
    return map;
  }, [data]);

  const months = useMemo(() => {
    const end = new Date();
    const start = subMonths(end, 3);
    return eachMonthOfInterval({ start, end });
  }, []);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>
            Behavior Grid
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>
            4-Month Behavioral Pattern
          </h3>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {Object.entries(qualityConfig)
            .filter(([k]) => k !== 'empty')
            .map(([key, cfg]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: 1.5,
                  background: cfg.color,
                  boxShadow: cfg.glow !== 'transparent' ? `0 0 4px ${cfg.glow}` : 'none',
                }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
                  {cfg.label}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Heatmap grid */}
      <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8 }}>
        {months.map((monthStart) => {
          const monthKey = format(monthStart, 'yyyy-MM');
          const daysInMonth = getDaysInMonth(monthStart);
          const firstDayOfWeek = getDay(startOfMonth(monthStart));

          return (
            <div key={monthKey} style={{ flexShrink: 0 }}>
              <div style={{
                fontSize: 10,
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: 10,
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                {format(monthStart, 'MMM yyyy')}
              </div>

              {/* Weekday headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 11px)', gap: 3, marginBottom: 5 }}>
                {weekDays.map((d, i) => (
                  <div key={i} style={{
                    fontSize: 7,
                    color: 'rgba(255,255,255,0.15)',
                    textAlign: 'center',
                    fontFamily: 'Space Mono, monospace',
                  }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 11px)', gap: 3 }}>
                {/* Empty cells for first week offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ width: 11, height: 11 }} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
                  const dayNum = dayIdx + 1;
                  const dateStr = `${monthKey}-${String(dayNum).padStart(2, '0')}`;
                  const dayData = dataMap[dateStr];
                  const quality = dayData?.quality ?? 'empty';
                  const cfg = qualityConfig[quality];

                  return (
                    <motion.div
                      key={dateStr}
                      className="heatmap-cell"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: dayIdx * 0.004 }}
                      onMouseEnter={(e) => {
                        if (dayData && quality !== 'empty' && quality !== 'inactive') {
                          const rect = (e.target as HTMLElement).getBoundingClientRect();
                          const x = Math.min(rect.left, window.innerWidth - 250);
                          const y = Math.max(rect.top - 200, 80);
                          setTooltip({ day: dayData, x, y });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 2,
                        background: cfg.color,
                        boxShadow: cfg.glow !== 'transparent' ? `0 0 5px ${cfg.glow}` : 'none',
                        cursor: quality !== 'empty' ? 'pointer' : 'default',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: tooltip.x + 16,
              top: tooltip.y,
              zIndex: 200,
              width: 220,
              background: 'rgba(12,12,14,0.96)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: 16,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Mono, monospace' }}>
                {format(parseISO(tooltip.day.date), 'MMM d, yyyy')}
              </span>
              <div style={{
                padding: '2px 8px',
                borderRadius: 4,
                background: `${qualityConfig[tooltip.day.quality].color}18`,
                border: `1px solid ${qualityConfig[tooltip.day.quality].color}30`,
                fontSize: 9,
                color: qualityConfig[tooltip.day.quality].color,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {qualityConfig[tooltip.day.quality].label}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { label: 'Focus Score', value: `${tooltip.day.focusScore}%` },
                { label: 'Screen Time', value: `${tooltip.day.screenTime}h` },
                { label: 'Goals Done', value: `${tooltip.day.completedGoals}` },
                { label: 'Avoided', value: `${tooltip.day.avoidedTasks}` },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                State · {tooltip.day.emotionalState}
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                {tooltip.day.reflection}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
