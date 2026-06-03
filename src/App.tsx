import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticleField from './components/ParticleField';
import AmbientBackground from './components/AmbientBackground';
import OpeningSequence from './components/OpeningSequence';
import Navigation from './components/Navigation';
import MobileNav from './components/MobileNav';
import Dashboard from './views/Dashboard';
import Analytics from './views/Analytics';
import Tasks from './views/Tasks';
import Reflection from './views/Reflection';
import Trajectory from './views/Trajectory';
import { generateHeatmapData } from './data/mockData';

type View = 'dashboard' | 'analytics' | 'tasks' | 'reflection' | 'trajectory';

const heatmapData = generateHeatmapData(4);

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [activeView, setActiveView] = useState<View>('dashboard');

  const handleOpeningComplete = useCallback(() => {
    setShowOpening(false);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060608',
      position: 'relative',
    }}>
      {/* Background layers */}
      <AmbientBackground />
      <ParticleField />

      {/* Opening sequence */}
      <AnimatePresence>
        {showOpening && (
          <OpeningSequence onComplete={handleOpeningComplete} />
        )}
      </AnimatePresence>

      {/* Main app */}
      <AnimatePresence>
        {!showOpening && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <Navigation activeView={activeView} setActiveView={setActiveView} />
            <MobileNav activeView={activeView} setActiveView={setActiveView} />

            <AnimatePresence mode="wait">
              {activeView === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                >
                  <Dashboard heatmapData={heatmapData} />
                </motion.div>
              )}

              {activeView === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                >
                  <Analytics />
                </motion.div>
              )}

              {activeView === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                >
                  <Tasks />
                </motion.div>
              )}

              {activeView === 'reflection' && (
                <motion.div
                  key="reflection"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                >
                  <Reflection />
                </motion.div>
              )}

              {activeView === 'trajectory' && (
                <motion.div
                  key="trajectory"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                >
                  <Trajectory />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
