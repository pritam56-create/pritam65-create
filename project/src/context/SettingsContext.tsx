import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Settings, PersonalityMode, ThemeMode, AnimationMode } from '../types';

interface SettingsContextType {
  settings: Settings;
  updateTheme: (theme: ThemeMode) => void;
  updatePersonality: (personality: PersonalityMode) => void;
  updateAnimationMode: (animationMode: AnimationMode) => void;
  toggleVoice: () => void;
  toggleSound: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: Settings = {
  theme: 'dark',
  personality: 'professional',
  voiceEnabled: false,
  soundEnabled: true,
  animationMode: 'particles',
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateTheme = (theme: ThemeMode) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updatePersonality = (personality: PersonalityMode) => {
    setSettings(prev => ({ ...prev, personality }));
  };

  const updateAnimationMode = (animationMode: AnimationMode) => {
    setSettings(prev => ({ ...prev, animationMode }));
  };

  const toggleVoice = () => {
    setSettings(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
  };

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateTheme,
      updatePersonality,
      updateAnimationMode,
      toggleVoice,
      toggleSound,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};