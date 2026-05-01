import { motion } from 'framer-motion';
import { BarChart2, Map, Layers, LayoutTemplate, BrainCircuit, Code2, Database, BookOpen, Clock, Lightbulb } from 'lucide-react';

/**
 * Dashboard overview page — industry Figma style with Framer Motion.
 */
export default function DashboardPage({ onNavigate }) {
    const quickCards = [
        { key: 'sorting', icon: BarChart2, title: 'Sorting Visualizer', desc: '3 algorithms', color: 'hsl(var(--primary))', stat: 'Bubble, Merge, Quick' },
        { key: 'graph', icon: Map, title: 'Graph Visualizer', desc: '3 algorithms', color: 'hsl(var(--accent))', stat: 'BFS, DFS, Dijkstra' },
        { key: 'datastructs', icon: Layers, title: 'Data Structures', desc: '6 structures', color: 'hsl(var(--warning))', stat: 'Stack, Queue, Tree…' },
        { key: 'comparison', icon: LayoutTemplate, title: 'Algorithm Compare', desc: 'Side-by-side', color: 'hsl(var(--secondary))', stat: 'Compare performance' },
    ];

    const recentItems = [
        { algo: 'Bubble Sort', type: 'Sorting', time: '2 min ago', status: 'completed' },
        { algo: 'BFS', type: 'Pathfinding', time: '5 min ago', status: 'completed' },
        { algo: 'Quick Sort', type: 'Sorting', time: '12 min ago', status: 'completed' },
        { algo: 'Dijkstra', type: 'Pathfinding', time: '18 min ago', status: 'completed' },
        { algo: 'Merge Sort', type: 'Sorting', time: '25 min ago', status: 'completed' },
    ];

    const stats = [
        { label: 'Algorithms', value: '6', icon: Code2, color: 'hsl(var(--primary))' },
        { label: 'Visualizations', value: '2', icon: BrainCircuit, color: 'hsl(var(--accent))' },
        { label: 'Data Structures', value: '6', icon: Database, color: 'hsl(var(--warning))' },
        { label: 'Learning Modules', value: '4', icon: BookOpen, color: 'hsl(var(--secondary))' },
    ];

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
            className="page-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="page-header" variants={itemVariants}>
                <div>
                    <h1 className="page-title text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Dashboard</h1>
                    <p className="page-subtitle">Welcome back — explore algorithms and data structures</p>
                </div>
                <div className="header-actions">
                    <span className="date-badge">📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </motion.div>

            {/* Overview Stats */}
            <motion.div className="dash-stats-row" variants={itemVariants}>
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div 
                            className="dash-stat-card glass-panel transition-colors duration-500" 
                            key={s.label}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="dash-stat-icon" style={{ background: `color-mix(in srgb, ${s.color}, transparent 85%)`, color: s.color }}>
                                <Icon size={24} />
                            </div>
                            <div className="dash-stat-info">
                                <span className="dash-stat-value" style={{ color: s.color }}>{s.value}</span>
                                <span className="dash-stat-label">{s.label}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Quick Access */}
            <motion.h2 className="section-title text-2xl font-bold tracking-tight mb-6 mt-8" variants={itemVariants}>Quick Access</motion.h2>
            <motion.div className="quick-grid" variants={itemVariants}>
                {quickCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div 
                            className="quick-card glass-panel group" 
                            key={card.key} 
                            onClick={() => onNavigate(card.key)} 
                            style={{ cursor: 'pointer' }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="quick-card-top">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: card.color + '18', color: card.color }}>
                                    <Icon size={24} />
                                </div>
                                <span className="quick-arrow" style={{ color: card.color }}>→</span>
                            </div>
                            <h3 className="text-lg font-bold">{card.title}</h3>
                            <p className="quick-desc">{card.desc}</p>
                            <span className="quick-stat">{card.stat}</span>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Recent Activity */}
            <motion.div className="dash-bottom-row mt-8" variants={itemVariants}>
                <motion.div className="activity-card glass-panel" variants={itemVariants}>
                    <h2 className="section-title flex items-center gap-2 mb-6">
                        <Clock className="text-primary" size={20} />
                        Recent Activity
                    </h2>
                    <div className="activity-list">
                        {recentItems.map((item, i) => (
                            <motion.div 
                                className="activity-item group hover:bg-white/5 cursor-pointer rounded-xl transition-colors" 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="activity-left">
                                    <span className="activity-dot shadow-[0_0_8px_#2dd4bf]" />
                                    <div>
                                        <span className="activity-algo group-hover:text-primary transition-colors">{item.algo}</span>
                                        <span className="activity-type">{item.type}</span>
                                    </div>
                                </div>
                                <span className="activity-time">{item.time}</span>
                                <span className="activity-badge border border-success/20">{item.status}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="tips-card glass-panel" variants={itemVariants}>
                    <h2 className="section-title flex items-center gap-2 mb-6">
                        <Lightbulb className="text-warning" size={20} />
                        Quick Tips
                    </h2>
                    <div className="tip-item">
                        <span className="tip-num text-primary/40">01</span>
                        <div>
                            <strong className="text-foreground">Start with Bubble Sort</strong>
                            <p>It's the simplest sorting algorithm — great for understanding the basics.</p>
                        </div>
                    </div>
                    <div className="tip-item">
                        <span className="tip-num text-secondary/40">02</span>
                        <div>
                            <strong className="text-foreground">Draw walls in Pathfinding</strong>
                            <p>Click cells to create obstacles, then watch BFS find the shortest path.</p>
                        </div>
                    </div>
                    <div className="tip-item border-none">
                        <span className="tip-num text-accent/40">03</span>
                        <div>
                            <strong className="text-foreground">Use Step mode</strong>
                            <p>Click ⏭ to advance one step at a time for detailed analysis.</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
