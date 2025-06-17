import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthStore, useNotificationStore } from '@/store';
import { supabase } from '@/api/supabase';
import type { User } from '@/types';

// Hook pour l'authentification
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Récupérer les informations utilisateur depuis la base de données
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        const user: User = {
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          company: userData.company,
          role: userData.role as any,
          avatar: userData.avatar,
          createdAt: userData.created_at,
          updatedAt: userData.updated_at,
        };

        login(user);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: {
      firstName: string;
      lastName: string;
      company: string;
    }
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Créer le profil utilisateur
        const { error: profileError } = await supabase.from('users').insert({
          id: data.user.id,
          email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          company: userData.company,
          role: 'viewer',
        });

        if (profileError) throw profileError;
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      logout();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};

// Hook pour les notifications
export const useNotifications = () => {
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
  } = useNotificationStore();

  const showSuccess = useCallback(
    (title: string, message: string) => {
      addNotification({
        userId: '',
        type: 'system_update',
        title,
        message,
        isRead: false,
      });
    },
    [addNotification]
  );

  const showError = useCallback(
    (title: string, message: string) => {
      addNotification({
        userId: '',
        type: 'system_update',
        title,
        message,
        isRead: false,
      });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (title: string, message: string) => {
      addNotification({
        userId: '',
        type: 'system_update',
        title,
        message,
        isRead: false,
      });
    },
    [addNotification]
  );

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showInfo,
  };
};

// Hook pour les données avec cache
export const useQuery = <T>(
  key: string,
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    staleTime?: number;
  }
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const { enabled = true, refetchInterval, staleTime = 5 * 60 * 1000 } = options || {};

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    const now = Date.now();
    if (data && now - lastFetch < staleTime) {
      return; // Data is still fresh
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await queryFn();
      setData(result);
      setLastFetch(now);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [enabled, queryFn, data, lastFetch, staleTime]);

  const refetch = useCallback(() => {
    setLastFetch(0); // Force refetch
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (refetchInterval && enabled) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval, enabled]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

// Hook pour les mutations
export const useMutation = <T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options?: {
    onSuccess?: (data: T, variables: V) => void;
    onError?: (error: Error, variables: V) => void;
  }
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: V) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        options?.onSuccess?.(result, variables);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options?.onError?.(error, variables);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options]
  );

  return {
    mutate,
    isLoading,
    error,
  };
};

// Hook pour la pagination
export const usePagination = (totalItems: number, itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    reset,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

// Hook pour le debounce
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook pour le local storage
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

// Hook pour détecter les clics en dehors d'un élément
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Hook pour les raccourcis clavier
export const useKeyboard = (
  key: string,
  callback: () => void,
  options?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
  }
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { ctrl = false, shift = false, alt = false } = options || {};

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift &&
        event.altKey === alt
      ) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [key, callback, options]);
};

// Hook pour la détection de la taille d'écran
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Hook pour l'état de chargement global
export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingCount = useRef(0);

  const startLoading = useCallback(() => {
    loadingCount.current += 1;
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    loadingCount.current = Math.max(0, loadingCount.current - 1);
    if (loadingCount.current === 0) {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

