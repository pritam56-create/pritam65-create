import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  authState: AuthState;
  login: (username: string, password?: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  updateUploadCount: () => void;
  canUpload: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ai_assistant_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Load user from localStorage on app start
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthState({
          user: {
            ...parsedAuth.user,
            createdAt: new Date(parsedAuth.user.createdAt),
            lastUploadReset: new Date(parsedAuth.user.lastUploadReset),
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password?: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: uuidv4(),
      username,
      email: password ? `${username}@example.com` : undefined,
      isGuest: !password,
      createdAt: new Date(),
      uploadCount: 0,
      lastUploadReset: new Date(),
    };

    const newAuthState = {
      user,
      isAuthenticated: true,
      isLoading: false,
    };

    setAuthState(newAuthState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
    return true;
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      username: 'Guest User',
      isGuest: true,
      createdAt: new Date(),
      uploadCount: 0,
      lastUploadReset: new Date(),
    };

    const newAuthState = {
      user: guestUser,
      isAuthenticated: true,
      isLoading: false,
    };

    setAuthState(newAuthState);
    // Don't save guest sessions to localStorage
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUploadCount = () => {
    if (!authState.user) return;

    const now = new Date();
    const lastReset = new Date(authState.user.lastUploadReset);
    const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

    let updatedUser = { ...authState.user };

    // Reset count if 24 hours have passed
    if (hoursSinceReset >= 24) {
      updatedUser.uploadCount = 1;
      updatedUser.lastUploadReset = now;
    } else {
      updatedUser.uploadCount += 1;
    }

    const newAuthState = {
      ...authState,
      user: updatedUser,
    };

    setAuthState(newAuthState);
    
    if (!updatedUser.isGuest) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
    }
  };

  const canUpload = (): boolean => {
    if (!authState.user) return false;

    const now = new Date();
    const lastReset = new Date(authState.user.lastUploadReset);
    const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

    // Reset count if 24 hours have passed
    if (hoursSinceReset >= 24) {
      return true;
    }

    return authState.user.uploadCount < 10;
  };

  return (
    <AuthContext.Provider value={{
      authState,
      login,
      loginAsGuest,
      logout,
      updateUploadCount,
      canUpload,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};