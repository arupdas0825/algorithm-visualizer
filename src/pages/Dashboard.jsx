import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import ProfilePanelV2 from '../components/profile/ProfilePanelV2';
import { 
  Flame, 
  Award, 
  Shield, 
  Zap, 
  BookOpen, 
  Clock, 
  Activity, 
  Cpu, 
  Network, 
  Share2, 
  Layers,
  TrendingUp,
  Star,
  Target,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, progress } = useUserStore();

  const categories = [
    { title: 'Sorting', desc: 'Bubble, Merge, Quick, Heap...', path: '/sorting', icon: Activity, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
    { title: 'Pathfinding', desc: 'Dijkstra, A*, BFS, DFS...', path: '/pathfinding', icon: Share2, color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/20' },
    { title: 'Trees', desc: 'BST, AVL, Traversals...', path: '/trees', icon: Network, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
    { title: 'Dynamic Programming', desc: 'Knapsack, LCS, Fibonacci...', path: '/dp', icon: Cpu, color: 'from-orange-500 to-red-600', shadow: 'shadow-orange-500/20' },
    { title: 'Comparison Mode', desc: 'Side-by-side algorithm battles.', path: '/comparison', icon: Zap, color: 'from-indigo-500 to-purple-600', shadow: 'shadow-indigo-500/20' },
    { title: 'Data Structures', desc: 'Stacks, Queues, Linked Lists...', path: '/datastructs', icon: Layers, color: 'from-amber-400 to-yellow-600', shadow: 'shadow-yellow-500/20' },
    { title: 'Learning Hub', desc: 'Cheat sheets, Tutorials, AI Tutors...', path: '/learning', icon: BookOpen, color: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/20' },
  ];

  // AI Logic for recommendations based on goal and level
  const getAIRecommendations = () => {
    const recs = [];
    if (user?.learningGoal === 'DSA for Placements' || user?.learningGoal === 'Interview Preparation') {
      recs.push({
        type: 'Priority',
        title: 'Master Merge Sort',
        desc: 'Top companies love divide & conquer questions.',
        path: '/sorting',
        color: 'text-primary'
      });
      recs.push({
        type: 'Next Up',
        title: 'Dijkstra Implementation',
        desc: 'Essential for advanced routing problems.',
        path: '/pathfinding',
        color: 'text-secondary'
      });
    } else {
      recs.push({
        type: 'Trending',
        title: 'Binary Tree Traversals',
        desc: 'Build a strong foundation for graph theory.',
        path: '/trees',
        color: 'text-accent'
      });
      recs.push({
        type: 'Challenge',
        title: 'DP: Knapsack Problem',
        desc: 'Optimize your problem solving skills.',
        path: '/dp',
        color: 'text-orange-400'
      });
    }
    return recs;
  };

  const aiRecs = getAIRecommendations();

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight font-display text-white"
          >
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{user?.name?.split(' ')[0] || 'Explorer'}</span> 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-lg mt-1"
          >
            Tracking progress for <span className="text-white/60 italic">{user?.learningGoal || 'Algorithmic Mastery'}</span>
          </motion.p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-panel px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">XP Progress</span>
              <span className="text-sm font-bold text-white">{user?.xp || 0} / {user?.level * 1000}</span>
            </div>
            <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((user?.xp || 0) % 1000) / 10}%` }}
                className="h-full bg-primary"
              />
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-xs">
              Lvl {user?.level || 1}
            </div>
          </div>
        </div>
      </header>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Learning Streak', value: `${user?.streak || 1} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Mastered', value: `${progress?.completedAlgorithms?.length || 0} Algos`, icon: Award, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Experience', value: user?.experienceLevel || 'Beginner', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Time Spent', value: `${progress?.timeSpent || 0} Mins`, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className={`absolute -right-4 -top-4 w-20 h-20 ${stat.bg} blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity`} />
            <div className="flex flex-col gap-4 relative z-10">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Algorithm Modules */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><Cpu size={20} className="text-primary"/></div>
                Core Systems
              </h2>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">View All <ArrowRight size={14}/></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((item, i) => (
                <motion.div
                  key={i}
                  onClick={() => navigate(item.path)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`glass-panel p-6 rounded-3xl cursor-pointer group relative overflow-hidden border border-white/5 hover:border-white/20 transition-all ${item.shadow}`}
                >
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity pointer-events-none rounded-full`} />
                  <div className="flex items-start gap-5 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform`}>
                      <item.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-white/40 line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="glass-panel p-8 rounded-[2.5rem] border border-primary/20 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg"><Award size={20} className="text-secondary"/></div>
                Achievements
              </h2>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">3 / 12 Unlocked</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {[
                { name: 'Sorting Master', icon: Activity, color: 'text-blue-400', unlocked: true },
                { name: 'Pathfinder', icon: Share2, color: 'text-pink-400', unlocked: true },
                { name: 'Tree Architect', icon: Network, color: 'text-emerald-400', unlocked: true },
                { name: 'DP Genius', icon: Cpu, color: 'text-orange-400', unlocked: false },
              ].map((ach, i) => (
                <div key={i} className={`flex flex-col items-center gap-3 p-4 rounded-2xl border ${ach.unlocked ? 'border-white/10 bg-white/5' : 'border-white/5 bg-transparent opacity-40'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ach.unlocked ? 'bg-white/10 ' + ach.color : 'bg-white/5 text-white/20'}`}>
                    <ach.icon size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight text-center">{ach.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4">
          <ProfilePanelV2 />
        </div>
      </div>
    </div>
  );
}
