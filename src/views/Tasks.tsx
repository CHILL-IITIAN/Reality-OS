import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, initialTasks } from '../data/mockData';

const priorityConfig = {
  critical: { color: '#FF6B6B', glow: 'rgba(255,107,107,0.3)', label: 'Critical' },
  high: { color: '#FFB450', glow: 'rgba(255,180,80,0.3)', label: 'High' },
  medium: { color: '#78C8FF', glow: 'rgba(120,200,255,0.3)', label: 'Medium' },
  low: { color: 'rgba(255,255,255,0.25)', glow: 'transparent', label: 'Low' },
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium');
  const [newTag, setNewTag] = useState('');
  const [newDeepWork, setNewDeepWork] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isAdding, setIsAdding] = useState(false);

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const addTask = () => {
    if (!newText.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newText.trim(),
      priority: newPriority,
      tag: newTag.trim() || 'general',
      completed: false,
      deepWork: newDeepWork,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [task, ...prev]);
    setNewText('');
    setNewTag('');
    setNewDeepWork(false);
    setIsAdding(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const activeCount = tasks.filter(t => !t.completed).length;
  const deepWorkCount = tasks.filter(t => t.deepWork && !t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ padding: '88px 32px 48px', maxWidth: 800, margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 36 }}
      >
        <div style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Mono, monospace' }}>
          Intention System
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 100, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Active Intentions
        </h1>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            <span style={{ color: 'rgba(120,200,255,0.7)', fontFamily: 'Space Mono, monospace' }}>{activeCount}</span> active
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            <span style={{ color: 'rgba(180,140,255,0.7)', fontFamily: 'Space Mono, monospace' }}>{deepWorkCount}</span> deep work
          </span>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}
      >
        {/* Filters */}
        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(255,255,255,0.06)' : 'none',
                border: `1px solid ${filter === f ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
                borderRadius: 6,
                padding: '5px 12px',
                fontSize: 11,
                color: filter === f ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={() => setIsAdding(p => !p)}
          style={{
            background: isAdding ? 'rgba(120,200,255,0.1)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isAdding ? 'rgba(120,200,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 12,
            color: isAdding ? 'rgba(120,200,255,0.8)' : 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 14 }}>{isAdding ? '×' : '+'}</span>
          {isAdding ? 'Cancel' : 'New Intention'}
        </button>
      </motion.div>

      {/* Add task form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              marginBottom: 16,
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '22px 22px',
            }}>
              <input
                value={newText}
                onChange={e => setNewText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                placeholder="Define your intention clearly..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 300,
                  letterSpacing: '0.01em',
                  marginBottom: 16,
                  fontFamily: 'Inter, sans-serif',
                }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Priority */}
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as Task['priority'])}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6,
                    padding: '5px 10px',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                {/* Tag */}
                <input
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  placeholder="tag"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 6,
                    padding: '5px 10px',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    width: 90,
                  }}
                />

                {/* Deep work toggle */}
                <button
                  onClick={() => setNewDeepWork(p => !p)}
                  style={{
                    background: newDeepWork ? 'rgba(180,140,255,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${newDeepWork ? 'rgba(180,140,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 6,
                    padding: '5px 10px',
                    fontSize: 11,
                    color: newDeepWork ? 'rgba(180,140,255,0.8)' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    transition: 'all 0.2s',
                  }}
                >
                  ◈ Deep Work
                </button>

                {/* Submit */}
                <button
                  onClick={addTask}
                  style={{
                    background: 'rgba(120,200,255,0.12)',
                    border: '1px solid rgba(120,200,255,0.25)',
                    borderRadius: 6,
                    padding: '5px 16px',
                    fontSize: 11,
                    color: 'rgba(120,200,255,0.8)',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    marginLeft: 'auto',
                    transition: 'all 0.2s',
                  }}
                >
                  Add →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task list */}
      <AnimatePresence mode="popLayout">
        {filtered.map((task, i) => {
          const pCfg = priorityConfig[task.priority];
          return (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, height: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{ marginBottom: 8 }}
            >
              <div
                style={{
                  background: task.completed ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${task.completed ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 10,
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transition: 'all 0.2s',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Priority indicator */}
                <div style={{
                  width: 3,
                  height: 20,
                  borderRadius: 2,
                  background: task.completed ? 'rgba(255,255,255,0.1)' : pCfg.color,
                  boxShadow: task.completed ? 'none' : `0 0 8px ${pCfg.glow}`,
                  flexShrink: 0,
                }} />

                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: `1px solid ${task.completed ? 'rgba(109,255,184,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    background: task.completed ? 'rgba(109,255,184,0.1)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                >
                  {task.completed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ fontSize: 9, color: 'rgba(109,255,184,0.8)' }}
                    >
                      ✓
                    </motion.span>
                  )}
                </button>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: 13,
                    color: task.completed ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.78)',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    textDecorationColor: 'rgba(255,255,255,0.2)',
                    fontWeight: 300,
                    letterSpacing: '0.01em',
                    display: 'block',
                    marginBottom: 5,
                  }}>
                    {task.text}
                  </span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 9,
                      padding: '2px 7px',
                      borderRadius: 3,
                      background: `${pCfg.color}12`,
                      color: task.completed ? 'rgba(255,255,255,0.2)' : pCfg.color,
                      border: `1px solid ${pCfg.color}20`,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {pCfg.label}
                    </span>
                    <span style={{
                      fontSize: 9,
                      padding: '2px 7px',
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.05em',
                    }}>
                      #{task.tag}
                    </span>
                    {task.deepWork && (
                      <span style={{
                        fontSize: 9,
                        padding: '2px 7px',
                        borderRadius: 3,
                        background: 'rgba(180,140,255,0.08)',
                        color: task.completed ? 'rgba(255,255,255,0.15)' : 'rgba(180,140,255,0.6)',
                        border: '1px solid rgba(180,140,255,0.15)',
                        letterSpacing: '0.05em',
                      }}>
                        ◈ deep
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: 4,
                    transition: 'color 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,107,107,0.5)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.1)')}
                >
                  ×
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '60px 0' }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.15)', fontStyle: 'italic' }}>
            {filter === 'completed' ? 'No completed intentions yet.' : 'No active intentions. Define your direction.'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
