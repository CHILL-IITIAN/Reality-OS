import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { realityChecks } from '../data/mockData';

export default function RealityCheck() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % realityChecks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 12,
      padding: '24px 28px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow line top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(180,140,255,0.3), transparent)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>
            Reality Check Engine
          </div>
          <div style={{ fontSize: 10, color: 'rgba(180,140,255,0.5)', letterSpacing: '0.08em', fontFamily: 'Space Mono, monospace' }}>
            Behavioral Observation
          </div>
        </div>
        <button
          onClick={() => setIsAutoPlaying(p => !p)}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 9,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      {/* Statement display */}
      <div style={{ minHeight: 72, display: 'flex', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIdx}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              fontWeight: 200,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.75)',
              fontStyle: 'italic',
              letterSpacing: '0.01em',
            }}
          >
            "{realityChecks[currentIdx]}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: 20, alignItems: 'center' }}>
        {realityChecks.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIdx(i); setIsAutoPlaying(false); }}
            style={{
              width: i === currentIdx ? 20 : 5,
              height: 5,
              borderRadius: 3,
              background: i === currentIdx ? 'rgba(180,140,255,0.6)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              boxShadow: i === currentIdx ? '0 0 8px rgba(180,140,255,0.4)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
