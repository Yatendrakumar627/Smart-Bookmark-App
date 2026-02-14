"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [glassIntensity, setGlassIntensity] = useState('high'); // 'high', 'medium', 'low'

  // Sync theme and glass to DOM
  useEffect(() => {
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply glass intensity variable
    const blurValues = { high: '16px', medium: '8px', low: '2px' };
    document.documentElement.style.setProperty('--glass-blur', blurValues[glassIntensity]);
  }, [theme, glassIntensity]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('sb-theme');
    const savedGlass = localStorage.getItem('sb-glass');

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to system preference if no saved theme
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    }

    if (savedGlass) {
      setGlassIntensity(savedGlass);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('sb-theme', newTheme);
  };

  const updateGlass = (intensity) => {
    setGlassIntensity(intensity);
    localStorage.setItem('sb-glass', intensity);
  };

  return (
    <DashboardContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      theme, 
      toggleTheme, 
      glassIntensity, 
      updateGlass 
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
