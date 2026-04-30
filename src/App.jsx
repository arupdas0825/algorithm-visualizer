import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import SortingVisualizer from './pages/SortingVisualizer';
import PathfindingVisualizer from './pages/PathfindingVisualizer';
import Dashboard from './pages/Dashboard';
import TreesVisualizer from './pages/TreesVisualizer';
import DPVisualizer from './pages/DPVisualizer';
import DataStructures from './pages/DataStructures';
import LearningHub from './pages/LearningHub';
import ComparisonMode from './pages/ComparisonMode';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import { useUserStore } from './store/useUserStore';

export default function App() {
  const location = useLocation();
  const { onboarded } = useUserStore();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* App Routes with Sidebar/Layout */}
        <Route element={onboarded ? <Layout /> : <Navigate to="/onboarding" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          <Route path="/trees" element={<TreesVisualizer />} />
          <Route path="/dp" element={<DPVisualizer />} />
          <Route path="/datastructs" element={<DataStructures />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/comparison" element={<ComparisonMode />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}