import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update body background class based on theme
    const body = document.body;
    body.className = '';
    if (theme === 'dark') body.classList.add('bg-background', 'text-white');
    if (theme === 'amoled') body.classList.add('bg-black', 'text-white');
    if (theme === 'cyberpunk') body.classList.add('bg-[#000b1e]', 'text-[#00ff9f]');
    if (theme === 'neon') body.classList.add('bg-[#0d0221]', 'text-[#00f5d4]');
    if (theme === 'light') body.classList.add('bg-gray-50', 'text-gray-900');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
