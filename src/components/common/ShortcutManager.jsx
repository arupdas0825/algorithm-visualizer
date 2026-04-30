import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShortcutManager({ onPlayPause, onReset }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          onPlayPause?.();
          break;
        case 'r':
          onReset?.();
          break;
        case 'd':
          navigate('/dashboard');
          break;
        case 's':
          navigate('/sorting');
          break;
        case 'p':
          navigate('/pathfinding');
          break;
        case 'b':
          navigate('/comparison');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayPause, onReset, navigate]);

  return null;
}
