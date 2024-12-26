import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  primary: string;
  accent: string;
}

interface ThemeContextType {
  currentTheme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: Theme = {
  primary: 'blue',
  accent: 'blue',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('app-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('app-theme', JSON.stringify(currentTheme));
    
    // Atualiza as variáveis CSS
    document.documentElement.style.setProperty('--primary-color', currentTheme.primary);
    document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
  }, [currentTheme]);

  const updateTheme = (newTheme: Partial<Theme>) => {
    setCurrentTheme(current => ({
      ...current,
      ...newTheme
    }));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
