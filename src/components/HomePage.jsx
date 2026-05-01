import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, BarChart2, Map, Zap, Settings2, Terminal as Github } from 'lucide-react';

/**
 * Stunning hero landing page inspired by premium tech products.
 * Uses Framer Motion for cinematic animations and Tailwind for layout.
 */
export default function HomePage({ onLaunch }) {
    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    return (
        <div className="home bg-background text-white min-h-screen relative overflow-hidden font-sans selection:bg-primary/30">
            {/* Ambient Backgrounds */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-50" />

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-background/50 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Zap size={18} className="text-white" fill="currentColor" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">AlgoViz</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#algorithms" className="hover:text-white transition-colors">Algorithms</a>
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-semibold text-muted hover:text-white transition-colors" onClick={onLaunch}>
                        Sign in
                    </button>
                    <button className="px-5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all" onClick={onLaunch}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-20 max-w-5xl mx-auto">
                <motion.div 
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="flex flex-col items-center w-full"
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-8">
                        <Sparkles size={14} />
                        <span>Pathfinding Visualizer is now live</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                        Understand algorithms<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">at the speed of thought.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
                        Watch sorting and pathfinding algorithms come to life through cinematic, high-performance visualizations. The ultimate tool for mastering computer science.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
                        <button 
                            className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                            onClick={onLaunch}
                        >
                            Launch App
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold text-lg transition-colors"
                            onClick={onLaunch}
                        >
                            <Play size={20} className="text-primary" fill="currentColor" />
                            Watch Demo
                        </button>
                    </motion.div>
                </motion.div>

                {/* Dashboard Preview / Orb */}
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, type: 'spring', damping: 20 }}
                    className="w-full mt-24 relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-30" />
                    <div className="relative bg-[#0f0e1f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                            <div className="w-3 h-3 rounded-full bg-error" />
                            <div className="w-3 h-3 rounded-full bg-warning" />
                            <div className="w-3 h-3 rounded-full bg-success" />
                            <span className="text-xs text-muted ml-2 font-mono">algo-viz / dashboard</span>
                        </div>
                        <div className="p-8 grid grid-cols-4 gap-4 h-64">
                            {/* Fake UI */}
                            <div className="col-span-1 border border-white/5 rounded-xl bg-white/5 flex flex-col gap-2 p-4">
                                <div className="w-full h-4 bg-white/10 rounded-md" />
                                <div className="w-3/4 h-4 bg-white/10 rounded-md" />
                                <div className="w-1/2 h-4 bg-white/10 rounded-md mt-4" />
                            </div>
                            <div className="col-span-3 border border-white/5 rounded-xl bg-white/5 relative overflow-hidden flex items-end justify-center gap-1 p-4">
                                {[30, 45, 20, 60, 80, 40, 90, 55, 25, 70].map((h, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: 1 + i * 0.1, duration: 0.5, type: 'spring' }}
                                        className="w-8 bg-primary rounded-t-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-24 border-t border-white/5 bg-background/50" id="features">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Master every detail</h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">We've built the most comprehensive visualization tool to help you understand complex data structures.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: BarChart2, title: 'Sorting Algorithms', desc: 'Watch arrays get sorted in real-time with granular speed controls and color-coded comparisons.' },
                            { icon: Map, title: 'Pathfinding Grids', desc: 'Draw custom mazes, place start and end points, and watch algorithms navigate the graph.' },
                            { icon: Settings2, title: 'Full Control', desc: 'Play, pause, step forward, and reverse. Analyze every single comparison and swap.' }
                        ].map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="p-8 rounded-2xl bg-surface/50 border border-white/5 hover:border-primary/30 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                    <p className="text-muted leading-relaxed">{f.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="relative z-10 py-20 text-center border-t border-white/5 bg-surface/20" id="about">
                <h2 className="text-4xl font-bold mb-6">Ready to start learning?</h2>
                <button 
                    className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-colors shadow-lg shadow-primary/20"
                    onClick={onLaunch}
                >
                    Launch Visualizer
                </button>
                <div className="mt-16 flex items-center justify-center gap-2 text-muted">
                    <Github size={18} />
                    <span>Open Source on GitHub</span>
                </div>
            </footer>
        </div>
    );
}
