import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'smarthome_users';
const SESSION_STORAGE_KEY = 'smarthome_session';

// Simple hash function for password storage
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem(SESSION_STORAGE_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
    const storedUser = users[username];

    if (storedUser && storedUser.password === hashPassword(password)) {
      const userData = { username: storedUser.username, email: storedUser.email };
      setUser(userData);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (username: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
    
    if (users[username]) {
      return false; // User already exists
    }

    users[username] = {
      username,
      email,
      password: hashPassword(password),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
    
    const userData = { username, email };
    setUser(userData);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
