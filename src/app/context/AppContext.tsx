import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../lib/translations';

export type UserRole = 'staff' | 'manager' | 'records' | 'compliance' | 'admin';

interface User {
  name: string;
  id: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  direction: 'ltr' | 'rtl';
  t: (key: keyof typeof translations.en) => string;
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  theme: 'light' | 'dark'; // Assuming forced light for Govt but good to have struct
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };

  const login = (role: UserRole) => {
    // Mock user data based on role
    const mockUsers: Record<UserRole, User> = {
      staff: { name: 'Ahmed R.', id: 'EMP-1023', role: 'staff', department: 'Corporate Finance' },
      manager: { name: 'Fatima S.', id: 'MGR-5521', role: 'manager', department: 'Corporate Finance' },
      records: { name: 'Saeed K.', id: 'REC-9912', role: 'records', department: 'Archives' },
      compliance: { name: 'Layla M.', id: 'CMP-3321', role: 'compliance', department: 'Internal Audit' },
      admin: { name: 'System Admin', id: 'ADM-0001', role: 'admin', department: 'IT' },
    };
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        direction,
        t,
        user,
        login,
        logout,
        theme: 'light',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
