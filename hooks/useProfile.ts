import { useSupabaseData, type Profile, type ProfileUpdateInput } from '@/contexts/DataContext';

type UseProfileResult = {
  profile: Profile | null;
  isLoading: boolean;
  isHydrated: boolean;
  refresh: () => Promise<void>;
  updateProfile: (input: ProfileUpdateInput) => Promise<Profile>;
};

export const useProfile = (): UseProfileResult => {
  const { profile, loading, isHydrated, refreshProfile, updateProfile } = useSupabaseData();

  return {
    profile,
    isLoading: loading.profile,
    isHydrated,
    refresh: refreshProfile,
    updateProfile,
  };
};

export default useProfile;
