import { motion } from 'framer-motion';
import { BookOpen, Award, Terminal, Code, Cpu, Activity, Zap, Play, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LearningHub() {
  const navigate = useNavigate();

  const roadmap = [
    { title: 'Foundations', items: ['Time Complexity', 'Space Complexity', 'Arrays', 'Strings'], status: 'completed' },
    { title: 'Basic Algorithms', items: ['Bubble Sort', 'Insertion Sort', 'Linear Search'], status: 'in-progress' },
    { title: 'Advanced Sorting', items: ['Quick Sort', 'Merge Sort', 'Heap Sort'], status: 'locked' },
    { title: 'Non-Linear DS', items: ['Trees', 'Graphs', 'Heaps'], status: 'locked' },
  ];

  const cheatsheets = [
    { name: 'Sorting O-Notation', color: 'bg-blue-500' },
    { name: 'Graph Cheat Sheet', color: 'bg-purple-500' },
    { name: 'DP Master Table', color: 'bg-rose-500' },
  ];

  return (
    <div className="flex flex-col h-full gap-8 overflow-y-auto pb-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">Learning Hub</h1>
        <p className="text-muted text-lg">Your structured path to algorithm mastery.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Roadmap Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Activity className="text-primary"/> Mastery Roadmap</h2>
          <div className="space-y-4">
            {roadmap.map((stage, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    {stage.status === 'completed' ? <CheckCircle2 className="text-success" /> : <div className="w-6 h-6 rounded-full border-2 border-white/20" />}
                    <h3 className="text-xl font-bold">{stage.title}</h3>
                  </div>
                  <span className={clsx(
                    "text-xs font-bold uppercase tracking-widest px-2 py-1 rounded",
                    stage.status === 'completed' ? "bg-success/20 text-success" : stage.status === 'in-progress' ? "bg-primary/20 text-primary" : "bg-white/5 text-muted"
                  )}>
                    {stage.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 relative z-10">
                  {stage.items.map((item, j) => (
                    <div key={j} className="bg-background/50 p-2 rounded-lg text-xs font-medium text-muted border border-white/5 group-hover:border-primary/20 transition-colors">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar/Quick Info */}
        <div className="space-y-8">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="text-secondary"/> Quick Cheat Sheets</h3>
            <div className="space-y-3">
              {cheatsheets.map((cs, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                  <span className="text-sm font-medium">{cs.name}</span>
                  <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-primary/20 bg-primary/5">
             <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2 uppercase tracking-widest">
               <Zap size={14}/> Interview Prep
             </div>
             <h4 className="font-bold mb-2">Algorithm Patterns</h4>
             <p className="text-xs text-muted mb-4">Master the top 14 patterns used in FAANG interviews, from Sliding Window to Topological Sort.</p>
             <button className="glass-button w-full py-2 rounded-lg text-xs font-bold bg-primary text-white">
               View Patterns
             </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}
