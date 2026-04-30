import { motion } from 'framer-motion';
import { BookOpen, Target, Clock, CheckCircle2, ChevronRight, Brain, Zap, Key } from 'lucide-react';

const MODULES = [
    { icon: Brain, title: 'Sorting Fundamentals', desc: 'Learn why sorting matters, how to measure performance, and understand Big-O notation through hands-on examples.', lessons: 5, duration: '25 min', level: 'Beginner', color: '#2dd4a8', progress: 100 },
    { icon: Zap, title: 'Divide & Conquer', desc: 'Master the divide and conquer paradigm through Merge Sort and Quick Sort. Understand recursion and partition strategies.', lessons: 4, duration: '30 min', level: 'Intermediate', color: '#6366f1', progress: 30 },
    { icon: Target, title: 'Graph Traversals', desc: 'Explore BFS and DFS, understand when to use each, and learn about graph representations (adjacency list vs matrix).', lessons: 6, duration: '35 min', level: 'Intermediate', color: '#f59e0b', progress: 0 },
    { icon: Key, title: 'Shortest Path Algorithms', desc: "Deep dive into Dijkstra's algorithm, weighted graphs, priority queues, and real-world applications like GPS navigation.", lessons: 4, duration: '40 min', level: 'Advanced', color: '#ec4899', progress: 0 },
];

const CONCEPTS = [
    { term: 'Time Complexity', def: 'A measure of the amount of time an algorithm takes relative to input size.' },
    { term: 'Space Complexity', def: 'The amount of memory an algorithm uses relative to input size.' },
    { term: 'Big-O Notation', def: 'Describes the upper bound of an algorithm\'s growth rate in the worst case.' },
    { term: 'Stable Sort', def: 'A sorting algorithm that preserves the relative order of equal elements.' },
    { term: 'In-Place Algorithm', def: 'An algorithm that uses only a constant amount of extra memory.' },
    { term: 'Adjacency List', def: 'A graph representation where each vertex stores a list of its neighbors.' },
];

export default function LearningPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div 
            className="page-container max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="page-header" variants={itemVariants}>
                <div>
                    <h1 className="page-title text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Learning Center</h1>
                    <p className="page-subtitle">Interactive modules to master algorithms and data structures</p>
                </div>
            </motion.div>

            {/* Progress */}
            <motion.div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 mb-10 relative overflow-hidden group" variants={itemVariants}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-colors" />
                <div className="flex justify-between items-end relative z-10">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold">Your Progress</h3>
                        <p className="text-muted text-sm">1 of 4 modules completed • Keep it up!</p>
                    </div>
                    <span className="text-3xl font-black text-primary">32%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative z-10 border border-white/5">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: '32%' }}
                        transition={{ duration: 1, delay: 0.2, type: 'spring' }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDAgTDEwIDMwIEwyMCA0MCBMMzAgMzAgTDQwIDQwIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Modules */}
            <motion.h2 className="section-title text-2xl font-bold tracking-tight mb-6 flex items-center gap-2" variants={itemVariants}>
                <BookOpen className="text-primary" size={24} />
                Interactive Courses
            </motion.h2>
            
            <motion.div className="grid md:grid-cols-2 gap-6 mb-12" variants={itemVariants}>
                {MODULES.map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <motion.div 
                            className="glass-panel p-6 rounded-2xl flex flex-col hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden" 
                            key={i}
                            whileHover={{ y: -5 }}
                        >
                            {m.progress > 0 && m.progress < 100 && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                    <div className="h-full" style={{ width: `${m.progress}%`, background: m.color }} />
                                </div>
                            )}
                            
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: m.color + '20', color: m.color }}>
                                    <Icon size={24} />
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{ background: m.color + '10', color: m.color, borderColor: m.color + '30' }}>
                                    {m.level}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{m.title}</h3>
                            <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{m.desc}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4 text-xs font-semibold text-muted">
                                    <span className="flex items-center gap-1.5"><BookOpen size={14} /> {m.lessons} lessons</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {m.duration}</span>
                                </div>
                                
                                <button className="flex items-center justify-center gap-1 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                    {m.progress === 100 ? (
                                        <CheckCircle2 size={16} className="text-success" />
                                    ) : (
                                        <ChevronRight size={16} style={{ color: m.progress > 0 ? m.color : '' }} />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Key Concepts */}
            <motion.h2 className="section-title text-2xl font-bold tracking-tight mb-6" variants={itemVariants}>🔑 Key Concepts Dictionary</motion.h2>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" variants={itemVariants}>
                {CONCEPTS.map((c, i) => (
                    <motion.div 
                        className="glass-panel p-5 rounded-xl border-l-2 hover:bg-white/5 transition-colors" 
                        style={{ borderLeftColor: i % 2 === 0 ? '#6366f1' : '#2dd4bf' }}
                        key={i}
                        whileHover={{ x: 5 }}
                    >
                        <h4 className="font-bold text-sm mb-2">{c.term}</h4>
                        <p className="text-xs text-muted leading-relaxed">{c.def}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
