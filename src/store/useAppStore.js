import { create } from 'zustand';

const useAppStore = create((set) => ({
    page: 'home', // 'home' | 'dashboard' | 'sorting' | 'graph' | 'datastructs' | 'comparison' | 'learning' | 'docs'
    setPage: (page) => set({ page }),
}));

export default useAppStore;
