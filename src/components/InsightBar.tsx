import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const insights = [
  "Most resistance appears before starting, not during. Begin anyway.",
  "You've maintained 3 consecutive days without significant drift.",
  "Deep work sessions trending longer — momentum building.",
  "Pattern detected: strongest days follow evening reflections.",
  "Current trajectory: stabilizing after last week's disruption.",
];

export default function InsightBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [insight] = useState(() => insights[Math.floor(Math.random() * insights.length)]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            maxWidth: 560,
            width: 'calc(100vw - 48px)',
          }}
        >
          <div style={{
            background: 'rgba(10,10,14,0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '14px 18px',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: 'rgba(120,200,255,0.08)',
              border: '1px solid rgba(120,200,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 12, color: 'rgba(120,200,255,0.7)' }}>◎</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(120,200,255,0.4)', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>
                System Observation
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, margin: 0 }}>
                {insight}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 16,
                color: 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                padding: '2px',
                lineHeight: 1,
                flexShrink: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
