import { motion } from 'framer-motion';
import { format } from 'date-fns';

type View = 'dashboard' | 'analytics' | 'tasks' | 'reflection' | 'trajectory';

interface NavigationProps {
  activeView: View;
  setActiveView: (v: View) => void;
}

const navItems: { id: View; label: string; symbol: string }[] = [
  { id: 'dashboard', label: 'Observatory', symbol: '◎' },
  { id: 'analytics', label: 'Analytics', symbol: '◈' },
  { id: 'tasks', label: 'Intentions', symbol: '◻' },
  { id: 'reflection', label: 'Reflection', symbol: '◑' },
  { id: 'trajectory', label: 'Trajectory', symbol: '◭' },
];

export default function Navigation({ activeView, setActiveView }: NavigationProps) {
  const now = new Date();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 32px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 28,
          height: 28,
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: 8,
            height: 8,
            background: 'rgba(120,200,255,0.7)',
            borderRadius: 1,
          }} className="pulse-glow" />
        </div>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: '0.05em',
          color: 'rgba(255,255,255,0.7)',
        }}>
          RealityOS
        </span>
      </div>

      {/* Nav items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'color 0.2s ease',
              color: activeView === item.id ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.26)',
            }}
          >
            {activeView === item.id && (
              <motion.div
                layoutId="nav-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 20px rgba(120,200,255,0.04)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span style={{ fontSize: 9, opacity: 0.45 }}>{item.symbol}</span>
            <span style={{
              fontSize: 11,
              letterSpacing: '0.05em',
              fontWeight: activeView === item.id ? 400 : 300,
              position: 'relative',
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Date/time */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 2,
      }}>
        <span style={{
          fontSize: 10,
          fontFamily: 'Space Mono, monospace',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.08em',
        }}>
          {format(now, 'EEE, MMM d')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'rgba(109,255,184,0.6)',
            boxShadow: '0 0 6px rgba(109,255,184,0.4)',
          }} className="pulse-glow" />
          <span style={{
            fontSize: 9,
            letterSpacing: '0.2em',
            color: 'rgba(109,255,184,0.5)',
            textTransform: 'uppercase',
            fontFamily: 'Space Mono, monospace',
          }}>
            Active
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
