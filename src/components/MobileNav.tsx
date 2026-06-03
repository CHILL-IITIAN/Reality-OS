import { motion } from 'framer-motion';

type View = 'dashboard' | 'analytics' | 'tasks' | 'reflection' | 'trajectory';

interface MobileNavProps {
  activeView: View;
  setActiveView: (v: View) => void;
}

const navItems: { id: View; label: string; symbol: string }[] = [
  { id: 'dashboard', label: 'Observatory', symbol: '◎' },
  { id: 'analytics', label: 'Analytics', symbol: '◈' },
  { id: 'tasks', label: 'Intentions', symbol: '◻' },
  { id: 'reflection', label: 'Reflect', symbol: '◑' },
  { id: 'trajectory', label: 'Trajectory', symbol: '◭' },
];

export default function MobileNav({ activeView, setActiveView }: MobileNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(6,6,8,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 0 12px',
      }}
    >
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveView(item.id)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '6px 12px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <span style={{
            fontSize: 16,
            color: activeView === item.id ? 'rgba(120,200,255,0.8)' : 'rgba(255,255,255,0.2)',
            transition: 'all 0.2s',
            filter: activeView === item.id ? 'drop-shadow(0 0 6px rgba(120,200,255,0.4))' : 'none',
          }}>
            {item.symbol}
          </span>
          <span style={{
            fontSize: 8,
            color: activeView === item.id ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
            letterSpacing: '0.06em',
            transition: 'color 0.2s',
          }}>
            {item.label}
          </span>
          {activeView === item.id && (
            <motion.div
              layoutId="mobile-nav-dot"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'rgba(120,200,255,0.7)',
                boxShadow: '0 0 6px rgba(120,200,255,0.5)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
