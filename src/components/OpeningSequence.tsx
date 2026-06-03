import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openingStatements, atmospheres } from '../data/mockData';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [phase, setPhase] = useState<'init' | 'statement' | 'scan' | 'atmosphere' | 'done'>('init');
  const [statementIdx] = useState(() => Math.floor(Math.random() * openingStatements.length));
  const [atmosphereIdx] = useState(() => Math.floor(Math.random() * atmospheres.length));
  const [scanProgress, setScanProgress] = useState(0);
  const [systemLines, setSystemLines] = useState<string[]>([]);

  const statement = openingStatements[statementIdx];
  const atmosphere = atmospheres[atmosphereIdx];

  const scanLines = [
    'Initializing behavioral matrix...',
    'Loading pattern recognition layer...',
    'Calibrating attention signals...',
    'Synchronizing consistency index...',
    'Reading momentum trajectory...',
    'Reality anchors: confirmed.',
    'System ready.',
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('statement'), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === 'statement') {
      const t = setTimeout(() => setPhase('scan'), 2800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'scan') {
      let lineIdx = 0;
      const lineTimer = setInterval(() => {
        if (lineIdx < scanLines.length) {
          setSystemLines(prev => [...prev, scanLines[lineIdx]]);
          setScanProgress(Math.round(((lineIdx + 1) / scanLines.length) * 100));
          lineIdx++;
        } else {
          clearInterval(lineTimer);
          setTimeout(() => setPhase('atmosphere'), 600);
        }
      }, 340);
      return () => clearInterval(lineTimer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'atmosphere') {
      const t = setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 700);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="opening"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'radial-gradient(ellipse at 30% 40%, rgba(120,200,255,0.03) 0%, #060606 50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => { setPhase('done'); setTimeout(onComplete, 100); }}
            style={{
              position: 'absolute',
              bottom: 32,
              right: 32,
              background: 'none',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 6,
              padding: '6px 14px',
              fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'Space Mono, monospace',
            }}
          >
            Skip
          </motion.button>
          {/* Ambient orbs */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120,200,255,0.04) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} className="ambient-orb" />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180,140,255,0.04) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} className="ambient-orb" />

          {/* Logo mark */}
          <AnimatePresence>
            {(phase === 'init' || phase === 'statement') && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.9 }}
                style={{ marginBottom: 52, textAlign: 'center' }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  margin: '0 auto 20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <div style={{
                    width: 18,
                    height: 18,
                    background: 'rgba(120,200,255,0.55)',
                    borderRadius: 3,
                    position: 'relative',
                  }} className="pulse-glow">
                    <div style={{
                      position: 'absolute',
                      top: 3, left: 3, right: 3, bottom: 3,
                      background: 'rgba(0,0,0,0.4)',
                      borderRadius: 1,
                    }} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: 10,
                    boxShadow: '0 0 30px rgba(120,200,255,0.12), inset 0 0 20px rgba(120,200,255,0.03)',
                  }} />
                </div>
                <motion.div
                  initial={{ opacity: 0, letterSpacing: '0.5em' }}
                  animate={{ opacity: 1, letterSpacing: '0.35em' }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.18)',
                    textTransform: 'uppercase',
                  }}
                >
                  RealityOS
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.08)',
                    letterSpacing: '0.15em',
                    marginTop: 4,
                    fontFamily: 'Space Mono, monospace',
                  }}
                >
                  Behavioral Awareness System
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Statement phase */}
          <AnimatePresence mode="wait">
            {phase === 'statement' && (
              <motion.div
                key="statement"
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.9 }}
                style={{
                  maxWidth: 560,
                  textAlign: 'center',
                  padding: '0 32px',
                }}
              >
                <p style={{
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontWeight: 200,
                  lineHeight: 1.5,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.01em',
                }}>
                  {statement}
                </p>
              </motion.div>
            )}

            {/* Scan phase */}
            {phase === 'scan' && (
              <motion.div
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  maxWidth: 400,
                  padding: '0 32px',
                }}
              >
                <div style={{
                  marginBottom: 24,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', fontFamily: 'Space Mono, monospace' }}>
                    System Initialization
                  </span>
                  <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: 'rgba(120,200,255,0.5)' }}>
                    {scanProgress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{
                  width: '100%',
                  height: 1,
                  background: 'rgba(255,255,255,0.06)',
                  marginBottom: 24,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(120,200,255,0.4), rgba(180,140,255,0.4))',
                      boxShadow: '0 0 8px rgba(120,200,255,0.4)',
                    }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Scan lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {systemLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: i === systemLines.length - 1 ? 0.7 : 0.25 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontSize: 11,
                        fontFamily: 'Space Mono, monospace',
                        color: i === systemLines.length - 1 ? 'rgba(120,200,255,0.8)' : 'rgba(255,255,255,0.25)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {i === systemLines.length - 1 ? '→ ' : '  '}{line}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Atmosphere phase */}
            {phase === 'atmosphere' && (
              <motion.div
                key="atmosphere"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  fontFamily: 'Space Mono, monospace',
                }}>
                  Today's atmosphere
                </div>
                <div style={{
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  fontWeight: 200,
                  color: atmosphere.color,
                  letterSpacing: '0.05em',
                  textShadow: `0 0 40px ${atmosphere.color}60`,
                }}>
                  {atmosphere.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
