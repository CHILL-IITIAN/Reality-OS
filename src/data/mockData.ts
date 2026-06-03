import { format, subMonths, eachDayOfInterval } from 'date-fns';

export type DayQuality = 'deep-focus' | 'aligned' | 'recovery' | 'distracted' | 'drift' | 'inactive' | 'empty';

export interface DayData {
  date: string;
  quality: DayQuality;
  focusScore: number;
  screenTime: number;
  completedGoals: number;
  avoidedTasks: number;
  emotionalState: string;
  reflection: string;
  momentumQuality: string;
  consistencyStrength: number;
}

export interface Task {
  id: string;
  text: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  tag: string;
  completed: boolean;
  deepWork: boolean;
  createdAt: string;
}

export interface Reflection {
  id: string;
  date: string;
  thoughts: string;
  emotionalState: string;
  focusQuality: number;
  resistanceAreas: string;
  realizations: string;
  distractions: string;
}

const emotionalStates = ['present', 'scattered', 'clear', 'resistant', 'focused', 'drifting', 'anchored'];
const momentumQualities = ['building', 'sustained', 'declining', 'recovering', 'stagnant', 'accelerating'];
const reflectionNotes = [
  'Found clarity in the silence between tasks.',
  'Resistance peaked before the most important work.',
  'Phone usage correlated directly with lost momentum.',
  'Deep work session felt effortless after initial barrier.',
  'Noticed avoidance patterns emerging mid-afternoon.',
  'Morning routine created significant leverage.',
  'Creative output highest when disconnected.',
  'Social comparison disrupted focus trajectory.',
  'Recovery from distraction took 23 minutes average.',
  'Simplifying the environment increased output significantly.',
];

function generateQuality(): DayQuality {
  const rand = Math.random();
  if (rand < 0.08) return 'deep-focus';
  if (rand < 0.22) return 'aligned';
  if (rand < 0.38) return 'recovery';
  if (rand < 0.55) return 'distracted';
  if (rand < 0.68) return 'drift';
  if (rand < 0.78) return 'inactive';
  return 'empty';
}

export function generateHeatmapData(months: number = 4): DayData[] {
  const end = new Date();
  const start = subMonths(end, months);
  const days = eachDayOfInterval({ start, end });

  return days.map((day) => {
    const quality = generateQuality();
    const isFuture = day > new Date();
    return {
      date: format(day, 'yyyy-MM-dd'),
      quality: isFuture ? 'empty' : quality,
      focusScore: isFuture ? 0 : Math.floor(Math.random() * 40) + (quality === 'deep-focus' ? 55 : quality === 'aligned' ? 45 : quality === 'distracted' ? 20 : 30),
      screenTime: isFuture ? 0 : Math.floor(Math.random() * 6) + (quality === 'drift' ? 5 : 1),
      completedGoals: isFuture ? 0 : Math.floor(Math.random() * 5) + (quality === 'aligned' ? 3 : 0),
      avoidedTasks: isFuture ? 0 : Math.floor(Math.random() * 4),
      emotionalState: isFuture ? '' : emotionalStates[Math.floor(Math.random() * emotionalStates.length)],
      reflection: isFuture ? '' : reflectionNotes[Math.floor(Math.random() * reflectionNotes.length)],
      momentumQuality: isFuture ? '' : momentumQualities[Math.floor(Math.random() * momentumQualities.length)],
      consistencyStrength: isFuture ? 0 : Math.floor(Math.random() * 100),
    };
  });
}

export function generateWeeklyTrend() {
  return Array.from({ length: 12 }, (_, i) => ({
    week: `W${i + 1}`,
    focus: Math.floor(Math.random() * 30) + 40 + (i > 6 ? i * 2 : 0),
    distraction: Math.floor(Math.random() * 20) + 20 - (i > 6 ? i : 0),
    alignment: Math.floor(Math.random() * 25) + 35 + (i > 8 ? i * 3 : 0),
    deepWork: Math.floor(Math.random() * 15) + 20 + (i > 7 ? i * 2 : 0),
  }));
}

export function generateMomentumData() {
  let base = 50;
  return Array.from({ length: 30 }, (_, i) => {
    const delta = (Math.random() - 0.4) * 12;
    base = Math.max(10, Math.min(95, base + delta));
    return {
      day: i + 1,
      momentum: Math.round(base),
      threshold: 50,
    };
  });
}

export function generateDailyPattern() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    hour: hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`,
    focus: hour >= 6 && hour <= 22 ? Math.floor(
      Math.sin((hour - 6) * Math.PI / 16) * 60 + 
      (Math.random() * 20) + 
      (hour >= 9 && hour <= 11 ? 25 : 0) +
      (hour >= 15 && hour <= 17 ? 15 : 0)
    ) : Math.floor(Math.random() * 5),
    distraction: hour >= 6 && hour <= 22 ? Math.floor(Math.random() * 30) + (hour >= 12 && hour <= 14 ? 20 : 0) : 0,
  }));
}

export const initialTasks: Task[] = [
  { id: '1', text: 'Complete system architecture review', priority: 'critical', tag: 'deep-work', completed: false, deepWork: true, createdAt: new Date().toISOString() },
  { id: '2', text: 'Review behavioral patterns from last week', priority: 'high', tag: 'reflection', completed: false, deepWork: false, createdAt: new Date().toISOString() },
  { id: '3', text: 'Write morning clarity statement', priority: 'high', tag: 'mindset', completed: true, deepWork: false, createdAt: new Date().toISOString() },
  { id: '4', text: 'Reduce afternoon screen drift window', priority: 'medium', tag: 'habit', completed: false, deepWork: false, createdAt: new Date().toISOString() },
  { id: '5', text: 'Document resistance patterns before deep work', priority: 'medium', tag: 'awareness', completed: false, deepWork: true, createdAt: new Date().toISOString() },
  { id: '6', text: 'Evening review and recalibration', priority: 'low', tag: 'reflection', completed: true, deepWork: false, createdAt: new Date().toISOString() },
];

export const realityChecks = [
  "You planned intensely but executed inconsistently this week.",
  "Most resistance appeared before starting difficult tasks.",
  "Your strongest days happened after reduced phone usage.",
  "You consume clarity faster than you apply it.",
  "You are maintaining motion, even if slowly.",
  "The gap between intention and action narrowed slightly.",
  "Three consecutive days of drift detected. Pattern emerging.",
  "Your focus sessions are shortening. Attention fragmentation rising.",
  "Late evenings show highest distraction density.",
  "Morning clarity is being eroded by mid-day decisions.",
  "Your best work happened in silence. Silence is becoming rare.",
  "Task avoidance is preceding your most important obligations.",
];

export const trajectoryInsights = [
  { type: 'improving', text: "Focus stability improving at current trajectory.", detail: "+12% over 3 weeks" },
  { type: 'warning', text: "Distraction dependency showing upward pattern.", detail: "3 consecutive weeks" },
  { type: 'neutral', text: "Consistency rebuilding slowly after disruption.", detail: "Day 8 of recovery" },
  { type: 'improving', text: "Deep work sessions gaining duration.", detail: "+18min average" },
  { type: 'warning', text: "Evening drift window expanding weekly.", detail: "Now 2.3hrs avg" },
];

export const openingStatements = [
  "You are becoming what you repeatedly tolerate.",
  "Your direction is built quietly through repetition.",
  "Small daily drift becomes future distance.",
  "Your actions are writing your future pattern.",
  "What you avoid today becomes tomorrow's resistance.",
  "Clarity is not found. It is built, daily.",
  "The gap between who you are and who you intend to be is measurable.",
  "Every unconsidered hour is a vote for your current self.",
  "Momentum is either building or dissolving. There is no middle state.",
  "What you do in ordinary moments defines extraordinary outcomes.",
  "Your attention is your most finite resource.",
  "The pattern you live is the life you are choosing.",
];

export const atmospheres = [
  { label: 'calm precision', color: '#78C8FF' },
  { label: 'silent urgency', color: '#FFB450' },
  { label: 'focused recovery', color: '#6DFFB8' },
  { label: 'disciplined movement', color: '#B48CFF' },
  { label: 'deep reflection', color: '#78C8FF' },
  { label: 'momentum preservation', color: '#6DFFB8' },
  { label: 'clarity restoration', color: '#FFB450' },
];
