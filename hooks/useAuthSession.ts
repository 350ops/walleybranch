import { useAuth } from '@/contexts/AuthContext';

export const useAuthSession = () => {
  const { session, user, isLoading } = useAuth();
  return {
    session,
    user,
    isLoading,
    isAuthenticated: Boolean(session?.user),
  };
};

export default useAuthSession;
