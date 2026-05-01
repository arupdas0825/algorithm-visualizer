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

      setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      setOnboarded: (status) => set({ onboarded: status }),
      
      addExperience: (amount) => set((state) => {
        const currentXp = state.user?.xp || 0;
        const newXp = currentXp + amount;
        const currentLevel = state.user?.level || 1;
        const newLevel = Math.floor(newXp / 1000) + 1;
        
        // Check for level up
        if (newLevel > currentLevel) {
          // Add achievement logic here in the future
        }

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
        user: null, 
        onboarded: false, 
        progress: { completedAlgorithms: [], timeSpent: 0, lastAccessed: null, badges: [], achievements: [] } 
      }),
    }),
    {
      name: 'algomate-user-storage',
    }
  )
);
