import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Primary orb - top left */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.97, 1.04, 1],
          x: [0, 15, -8, 10, 0],
          y: [0, -10, 12, -5, 0],
          opacity: [0.35, 0.55, 0.3, 0.5, 0.35],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,200,255,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary orb - bottom right */}
      <motion.div
        animate={{
          scale: [1, 0.94, 1.06, 0.98, 1],
          x: [0, -12, 8, -6, 0],
          y: [0, 8, -14, 6, 0],
          opacity: [0.3, 0.45, 0.25, 0.4, 0.3],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '-8%',
          right: '-8%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,140,255,0.05) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Tertiary orb - center */}
      <motion.div
        animate={{
          scale: [1, 1.12, 0.95, 1.05, 1],
          opacity: [0.15, 0.25, 0.12, 0.2, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        style={{
          position: 'absolute',
          top: '40%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109,255,184,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top glow bar */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(120,200,255,0.12), transparent)',
        }}
      />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(4,4,6,0.7) 100%)',
      }} />
    </div>
  );
}
