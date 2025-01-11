import {
  createContext,
  useContext,
  createSignal,
  onMount,
  createMemo,
} from 'solid-js';
import { refreshToken } from '../services/authService';

export interface User {
  id: string;
  userName: string;
  email: string;
  token?: string; // Optional token field
}

interface UserContextType {
  user: User | null;
  isLoggedIn: () => boolean;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: (navigate?: (path: string) => void) => void;
  refreshSession: () => Promise<void>;
}

const UserContext = createContext<UserContextType>();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const UserProvider = (props: { children: any }) => {
  const [user, setUser] = createSignal<User | null>(null);
  const [refreshError, setRefreshError] = createSignal<string | null>(null);

  const login = (userData: User, token: string, refreshToken: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userData); // This will trigger reactivity for isLoggedIn
  };

  const logout = (navigate?: (path: string) => void) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    if (navigate) {
      navigate('/'); // Redirect explicitly
    }
  };

  const refreshSession = async () => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    const tokenValue = localStorage.getItem('token');

    if (!refreshTokenValue || !tokenValue) {
      logout();
      return;
    }

    try {
      const response = await refreshToken(refreshTokenValue, tokenValue);
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setUser({
          id: response.data.id,
          userName: response.data.userName,
          email: response.data.email,
          token: response.data.token,
        });
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to refresh session:', error);
      logout();
    }
  };

  onMount(async () => {
    try {
      await refreshSession();
    } catch (error) {
      console.error('Error during session refresh:', error);
    }
  });

  return (
    <UserContext.Provider
      value={{
        user: user(),
        isLoggedIn: createMemo(() => !!user()),
        login,
        logout,
        refreshSession,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
