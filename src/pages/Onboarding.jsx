import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Terminal, 
  Shield, 
  Target, 
  Code, 
  Sparkles,
  Camera,
  CheckCircle2,
  Brain
} from 'lucide-react';
import clsx from 'clsx';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    learningGoal: '',
    experienceLevel: '',
    profilePhoto: '',
    favAlgo: '',
    bio: ''
  });
  
  const { setUser, setOnboarded } = useUserStore();
  const navigate = useNavigate();

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleFinish = () => {
    setUser({ 
      ...formData,
      level: 1, 
      xp: 0, 
      streak: 1,
      joinedAt: new Date().toISOString()
    });
    setOnboarded(true);
    navigate('/dashboard');
  };

  const experienceLevels = [
    { id: 'Beginner', icon: Brain, desc: 'Just starting my coding journey.', color: 'from-blue-500 to-cyan-400' },
    { id: 'Intermediate', icon: Code, desc: 'I know the basics and want to dive deeper.', color: 'from-indigo-500 to-purple-400' },
    { id: 'Advanced', icon: Terminal, desc: 'Seasoned developer looking for mastery.', color: 'from-orange-500 to-red-400' },
  ];

  const learningGoals = [
    'DSA for Placements',
    'Competitive Programming',
    'Interview Preparation',
    'Learn Computer Science',
    'Improve Problem Solving'
  ];

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="fixed inset-0 bg-[#030712] z-[100] flex items-center justify-center overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Progress Bar */}
        <div className="absolute top-[-80px] left-0 w-full px-6 md:px-0">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">Algorithm OS</span>
              <h3 className="text-white font-bold text-lg">System Initialization</h3>
            </div>
            <span className="text-white/40 font-mono text-sm">Step {step} of {totalSteps}</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              className="glass-card p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.4)] relative group"
              >
                <div className="absolute inset-1 bg-[#030712] rounded-[1.8rem] flex items-center justify-center">
                  <Zap size={40} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
              </motion.div>
              <h1 className="text-5xl font-black mb-6 font-display tracking-tight text-white">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Algomate</span>
              </h1>
              <p className="text-white/60 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                The futuristic operating system for mastering data structures and algorithms. Let's create your digital identity.
              </p>
              <button 
                onClick={handleNext}
                className="group relative px-12 py-5 rounded-2xl bg-white text-black font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Initialize Profile <ChevronRight size={24} />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  whileHover={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </button>
            </motion.div>
          )}

          {/* STEP 2: BASICS */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass-card p-12 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <User size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">The Identity</h2>
                  <p className="text-white/40">How should we address you in the system?</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 ml-1">Full Name</label>
                  <input 
                    autoFocus
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Alan Turing"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl font-bold text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3 ml-1">Username</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-bold text-xl">@</span>
                    <input 
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      placeholder="algo_master"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-5 text-xl font-bold text-white outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={handleBack} className="p-5 rounded-2xl border border-white/10 text-white/60 hover:bg-white/5 transition-all">
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.name || !formData.username}
                    className="flex-1 py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    Next Protocol
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: EXPERIENCE */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-white mb-4">Level Selection</h2>
                <p className="text-white/40 text-lg">Define your current algorithmic proficiency.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {experienceLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setFormData({...formData, experienceLevel: lvl.id})}
                    className={clsx(
                      "group p-8 rounded-[2.5rem] border-2 transition-all text-left relative overflow-hidden h-full flex flex-col gap-6",
                      formData.experienceLevel === lvl.id 
                        ? "border-primary bg-primary/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]" 
                        : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/[0.07]"
                    )}
                  >
                    <div className={clsx(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                      formData.experienceLevel === lvl.id ? `bg-gradient-to-br ${lvl.color} text-white shadow-lg` : "bg-white/5 text-white/40"
                    )}>
                      <lvl.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">{lvl.id}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{lvl.desc}</p>
                    </div>
                    {formData.experienceLevel === lvl.id && (
                      <motion.div 
                        layoutId="active-check"
                        className="absolute top-6 right-6 text-primary"
                      >
                        <CheckCircle2 size={24} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 max-w-md mx-auto">
                <button onClick={handleBack} className="p-5 rounded-2xl border border-white/10 text-white/60 hover:bg-white/5 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!formData.experienceLevel}
                  className="flex-1 py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Confirm Level
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: GOALS */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass-card p-12 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                  <Target size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Primary Goal</h2>
                  <p className="text-white/40">What is your main focus on Algomate?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-10">
                {learningGoals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({...formData, learningGoal: goal})}
                    className={clsx(
                      "p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                      formData.learningGoal === goal 
                        ? "border-secondary bg-secondary/10 text-white" 
                        : "border-white/5 bg-white/5 text-white/60 hover:border-white/10"
                    )}
                  >
                    <span className="font-bold">{goal}</span>
                    <div className={clsx(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      formData.learningGoal === goal ? "border-secondary bg-secondary" : "border-white/20"
                    )}>
                      {formData.learningGoal === goal && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={handleBack} className="p-5 rounded-2xl border border-white/10 text-white/60 hover:bg-white/5 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!formData.learningGoal}
                  className="flex-1 py-5 rounded-2xl bg-secondary text-white font-black text-lg shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Next Module
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: EXTRAS */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass-card p-12 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Final Touches</h2>
                  <p className="text-white/40">Tell us a bit more about yourself (Optional).</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3 ml-1">Favorite Algorithm</label>
                    <input 
                      type="text"
                      value={formData.favAlgo}
                      onChange={(e) => setFormData({...formData, favAlgo: e.target.value})}
                      placeholder="e.g. Quick Sort, A*"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold text-white outline-none focus:border-accent transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Bio</label>
                    <textarea 
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="I love solving complex problems..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold text-white outline-none focus:border-white/20 transition-all placeholder:text-white/10 resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] hover:border-accent/30 hover:bg-accent/5 transition-all cursor-pointer group">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera size={32} className="text-white/20 group-hover:text-accent" />
                  </div>
                  <span className="text-sm font-bold text-white/40 group-hover:text-white">Upload Avatar</span>
                  <span className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">JPG, PNG up to 2MB</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleBack} className="p-5 rounded-2xl border border-white/10 text-white/60 hover:bg-white/5 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-1 py-5 rounded-2xl bg-white text-black font-black text-lg shadow-xl shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Finalize Initialization
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: FINALIZE */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100 }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full h-full border-4 border-primary rounded-full border-t-transparent animate-spin-slow"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.6)]"
                  >
                    <CheckCircle2 size={48} className="text-white" />
                  </motion.div>
                </div>
              </div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-4xl font-black text-white mb-4"
              >
                Access Granted, {formData.name}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-white/40 text-lg mb-12"
              >
                Your algorithmic journey begins now. System ready.
              </motion.p>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                onClick={handleFinish}
                className="group px-12 py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Enter Dashboard
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
