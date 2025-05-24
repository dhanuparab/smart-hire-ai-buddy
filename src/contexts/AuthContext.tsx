
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@airecruiter.com' && password === 'admin123') {
        const user = {
          id: '1',
          email,
          name: 'Admin User',
          avatar: '/placeholder.svg'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate proper Google OAuth validation with more realistic flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would:
      // 1. Redirect to Google OAuth
      // 2. Handle the callback with authorization code
      // 3. Exchange code for access token
      // 4. Validate the token with Google
      // 5. Extract verified user information
      
      // Simulate Google account selection and validation
      const availableGoogleAccounts = [
        { email: 'john.doe@gmail.com', name: 'John Doe' },
        { email: 'sarah.smith@gmail.com', name: 'Sarah Smith' },
        { email: 'mike.wilson@gmail.com', name: 'Mike Wilson' }
      ];
      
      // For demo, randomly select one account to simulate the OAuth flow
      const selectedAccount = availableGoogleAccounts[Math.floor(Math.random() * availableGoogleAccounts.length)];
      
      // Simulate validation check with Google servers
      if (selectedAccount.email && selectedAccount.name) {
        const mockGoogleUser = {
          id: `google_${Date.now()}`,
          email: selectedAccount.email,
          name: selectedAccount.name,
          avatar: '/placeholder.svg'
        };
        
        // Simulate successful OAuth token validation
        setUser(mockGoogleUser);
        localStorage.setItem('user', JSON.stringify(mockGoogleUser));
        
        console.log('Google login successful for:', selectedAccount.email);
      } else {
        throw new Error('Google authentication failed - invalid user data');
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate email validation
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Simulate password validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const user = {
        id: Date.now().toString(),
        email,
        name,
        avatar: '/placeholder.svg'
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithGoogle,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
