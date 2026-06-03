import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface ReflectionEntry {
  id: string;
  date: string;
  thoughts: string;
  emotionalState: string;
  focusQuality: number;
  resistanceAreas: string;
  realizations: string;
  distractions: string;
}

const emotionalStates = ['present', 'scattered', 'clear', 'resistant', 'focused', 'drifting', 'anchored', 'energized', 'depleted'];

const sampleEntries: ReflectionEntry[] = [
  {
    id: '1',
    date: format(new Date(Date.now() - 86400000), 'yyyy-MM-dd'),
    thoughts: 'The morning felt heavy but the work itself became lighter once I started. The resistance before sitting down was disproportionate to the actual difficulty.',
    emotionalState: 'present',
    focusQuality: 78,
    resistanceAreas: 'Starting the deep work session. Email checking as avoidance.',
    realizations: 'Most of my resistance is pre-task, not during. Once inside the work, it dissolves.',
    distractions: 'Phone at 2pm derailed a 45-minute focus window.',
  },
  {
    id: '2',
    date: format(new Date(Date.now() - 86400000 * 2), 'yyyy-MM-dd'),
    thoughts: 'Scattered day. Too many open loops. The clarity I had in the morning disappeared by noon. No single culprit — death by a thousand small decisions.',
    emotionalState: 'scattered',
    focusQuality: 42,
    resistanceAreas: 'Everything felt equally important. No clear priority anchor.',
    realizations: 'Without a primary intention for the day, everything becomes reactive.',
    distractions: 'Context switching. News cycle. Group messages.',
  },
];

const prompts = [
  'What was the quality of your attention today?',
  'Where did resistance appear first?',
  'What realization, if acted upon, would change most?',
  'What did you avoid, and why?',
  'When did you feel most aligned today?',
];

export default function Reflection() {
  const [entries, setEntries] = useState<ReflectionEntry[]>(sampleEntries);
  const [isWriting, setIsWriting] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ReflectionEntry | null>(null);
  const [form, setForm] = useState({
    thoughts: '',
    emotionalState: 'present',
    focusQuality: 60,
    resistanceAreas: '',
    realizations: '',
    distractions: '',
  });
  const [currentPrompt] = useState(() => prompts[Math.floor(Math.random() * prompts.length)]);

  const saveEntry = () => {
    if (!form.thoughts.trim()) return;
    const entry: ReflectionEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...form,
    };
    setEntries(prev => [entry, ...prev]);
    setForm({ thoughts: '', emotionalState: 'present', focusQuality: 60, resistanceAreas: '', realizations: '', distractions: '' });
    setIsWriting(false);
  };

  const emotionColor: Record<string, string> = {
    present: 'rgba(109,255,184,0.6)',
    scattered: 'rgba(255,180,80,0.6)',
    clear: 'rgba(120,200,255,0.6)',
    resistant: 'rgba(255,107,107,0.6)',
    focused: 'rgba(120,200,255,0.8)',
    drifting: 'rgba(255,107,107,0.5)',
    anchored: 'rgba(109,255,184,0.7)',
    energized: 'rgba(180,140,255,0.6)',
    depleted: 'rgba(255,255,255,0.25)',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ padding: '88px 32px 48px', maxWidth: 760, margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 36 }}
      >
        <div style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Mono, monospace' }}>
          Private Chamber
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 100, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Daily Reflection
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
          "{currentPrompt}"
        </p>
      </motion.div>

      {/* Begin reflection button */}
      {!isWriting && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: 28 }}
        >
          <button
            onClick={() => setIsWriting(true)}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '18px 24px',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.025)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 300, marginBottom: 4 }}>
                Begin today's reflection
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Mono, monospace' }}>
                {format(new Date(), 'EEEE, MMMM d')}
              </div>
            </div>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.15)' }}>→</span>
          </button>
        </motion.div>
      )}

      {/* Writing form */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '28px 28px',
              marginBottom: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,140,255,0.25), transparent)' }} />

            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'Space Mono, monospace' }}>
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </div>

            {/* Main thoughts */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>
                Thoughts & Observations
              </label>
              <textarea
                value={form.thoughts}
                onChange={e => setForm(p => ({ ...p, thoughts: e.target.value }))}
                placeholder="Write freely. This is your private space..."
                style={{
                  width: '100%',
                  minHeight: 120,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  resize: 'vertical',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  letterSpacing: '0.01em',
                  fontFamily: 'Inter, sans-serif',
                  paddingBottom: 8,
                }}
              />
            </div>

            {/* Emotional state + focus quality */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 22 }}>
              <div>
                <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>
                  Emotional State
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {emotionalStates.map(state => (
                    <button
                      key={state}
                      onClick={() => setForm(p => ({ ...p, emotionalState: state }))}
                      style={{
                        background: form.emotionalState === state ? `${emotionColor[state]}15` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${form.emotionalState === state ? emotionColor[state] + '40' : 'rgba(255,255,255,0.05)'}`,
                        borderRadius: 5,
                        padding: '4px 10px',
                        fontSize: 10,
                        color: form.emotionalState === state ? emotionColor[state] : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        letterSpacing: '0.06em',
                        transition: 'all 0.2s',
                      }}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>
                  Focus Quality: <span style={{ color: 'rgba(120,200,255,0.6)', fontFamily: 'Space Mono, monospace' }}>{form.focusQuality}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.focusQuality}
                  onChange={e => setForm(p => ({ ...p, focusQuality: +e.target.value }))}
                  style={{
                    width: '100%',
                    accentColor: 'rgba(120,200,255,0.7)',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Resistance + Realizations */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 22 }}>
              <div>
                <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>
                  Resistance Areas
                </label>
                <textarea
                  value={form.resistanceAreas}
                  onChange={e => setForm(p => ({ ...p, resistanceAreas: e.target.value }))}
                  placeholder="Where did you resist?"
                  style={{
                    width: '100%',
                    minHeight: 70,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    resize: 'none',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>
                  Key Realizations
                </label>
                <textarea
                  value={form.realizations}
                  onChange={e => setForm(p => ({ ...p, realizations: e.target.value }))}
                  placeholder="What became clear?"
                  style={{
                    width: '100%',
                    minHeight: 70,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    resize: 'none',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsWriting(false)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 7,
                  padding: '9px 18px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.25)',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s',
                }}
              >
                Discard
              </button>
              <button
                onClick={saveEntry}
                style={{
                  background: 'rgba(180,140,255,0.1)',
                  border: '1px solid rgba(180,140,255,0.25)',
                  borderRadius: 7,
                  padding: '9px 22px',
                  fontSize: 12,
                  color: 'rgba(180,140,255,0.8)',
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s',
                }}
              >
                Save Reflection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past entries */}
      <div>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Space Mono, monospace' }}>
          Previous Reflections
        </div>
        <AnimatePresence>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ marginBottom: 10 }}
            >
              <div
                onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
                style={{
                  background: 'rgba(255,255,255,0.018)',
                  border: `1px solid ${selectedEntry?.id === entry.id ? 'rgba(180,140,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: 10,
                  padding: '18px 22px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: selectedEntry?.id === entry.id ? 16 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Mono, monospace' }}>
                      {format(new Date(entry.date), 'MMM d')}
                    </span>
                    <span style={{
                      fontSize: 9,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: `${emotionColor[entry.emotionalState] || 'rgba(255,255,255,0.1)'}15`,
                      color: emotionColor[entry.emotionalState] || 'rgba(255,255,255,0.3)',
                      border: `1px solid ${emotionColor[entry.emotionalState] || 'rgba(255,255,255,0.1)'}30`,
                      letterSpacing: '0.08em',
                    }}>
                      {entry.emotionalState}
                    </span>
                    <span style={{ fontSize: 10, color: 'rgba(120,200,255,0.4)', fontFamily: 'Space Mono, monospace' }}>
                      {entry.focusQuality}%
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', transition: 'transform 0.2s', transform: selectedEntry?.id === entry.id ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>›</span>
                </div>

                <AnimatePresence>
                  {selectedEntry?.id === entry.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 14, fontStyle: 'italic' }}>
                        "{entry.thoughts}"
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {entry.resistanceAreas && (
                          <div>
                            <div style={{ fontSize: 9, color: 'rgba(255,107,107,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>Resistance</div>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>{entry.resistanceAreas}</p>
                          </div>
                        )}
                        {entry.realizations && (
                          <div>
                            <div style={{ fontSize: 9, color: 'rgba(109,255,184,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>Realizations</div>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>{entry.realizations}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
