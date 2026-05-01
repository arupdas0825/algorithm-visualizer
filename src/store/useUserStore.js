import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {
        name: '',
        username: '',
        learningGoal: '',
        experienceLevel: '',
        profilePhoto: '',
        favAlgo: '',
        bio: '',
        level: 1,
        xp: 0,
        streak: 1,
        joinedAt: ''
      },
      progress: {
        completedAlgorithms: [],
        timeSpent: 0, // in minutes
        lastAccessed: null,
        badges: [],
        achievements: [], // { id, name, icon, date }
      },
      onboarded: false,

      settings: {
        appearance: {
          theme: 'dark',
          glassIntensity: 0.8,
          noiseEnabled: true
        },
        ui: {
          animationIntensity: 1,
          reducedMotion: false,
          compactMode: false,
          immersiveMode: false
        },
        sound: {
          enabled: true,
          uiSounds: true,
          algoSounds: true,
          volume: 0.5
        },
        visualizer: {
          speed: 1,
          nodeSize: 24,
          spacing: 4,
          colorPreset: 'default'
        },
        learning: {
          difficulty: 'Intermediate',
          aiTutor: true,
          autoSave: true
        },
        accessibility: {
          highContrast: false,
          largeText: false
        }
      },

      setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      setSettings: (category, newSettings) => set((state) => ({
        settings: {
          ...state.settings,
          [category]: { ...state.settings[category], ...newSettings }
        }
      })),
      setOnboarded: (status) => set({ onboarded: status }),
      
      addExperience: (amount) => set((state) => {
        const currentXp = state.user?.xp || 0;
        const newXp = currentXp + amount;
        const currentLevel = state.user?.level || 1;
        const newLevel = Math.floor(newXp / 1000) + 1;
        
        return {
          user: { ...state.user, xp: newXp, level: newLevel }
        };
      }),

      completeAlgorithm: (algoId) => set((state) => {
        if (state.progress.completedAlgorithms.includes(algoId)) return state;
        return {
          progress: {
            ...state.progress,
            completedAlgorithms: [...state.progress.completedAlgorithms, algoId]
          }
        };
      }),

      addTimeSpent: (minutes) => set((state) => ({
        progress: {
          ...state.progress,
          timeSpent: (state.progress.timeSpent || 0) + minutes
        }
      })),

      resetData: () => set({ 
        user: { name: '', username: '', learningGoal: '', experienceLevel: '', profilePhoto: '', favAlgo: '', bio: '', level: 1, xp: 0, streak: 1, joinedAt: '' }, 
        onboarded: false, 
        progress: { completedAlgorithms: [], timeSpent: 0, lastAccessed: null, badges: [], achievements: [] },
        settings: {
          appearance: { theme: 'dark', glassIntensity: 0.8, noiseEnabled: true },
          ui: { animationIntensity: 1, reducedMotion: false, compactMode: false, immersiveMode: false },
          sound: { enabled: true, uiSounds: true, algoSounds: true, volume: 0.5 },
          visualizer: { speed: 1, nodeSize: 24, spacing: 4, colorPreset: 'default' },
          learning: { difficulty: 'Intermediate', aiTutor: true, autoSave: true },
          accessibility: { highContrast: false, largeText: false }
        }
      }),
    }),
    {
      name: 'algomate-user-storage',
    }
  )
);
