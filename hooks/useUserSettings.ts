import {
  useSupabaseData,
  type UserSettings,
  type UserSettingsUpdateInput,
} from '@/contexts/DataContext';

type UseUserSettingsResult = {
  settings: UserSettings | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  updateSettings: (input: UserSettingsUpdateInput) => Promise<UserSettings>;
};

export const useUserSettings = (): UseUserSettingsResult => {
  const { userSettings, loading, refreshUserSettings, updateUserSettings } = useSupabaseData();

  return {
    settings: userSettings,
    isLoading: loading.settings,
    refresh: refreshUserSettings,
    updateSettings: updateUserSettings,
  };
};

export default useUserSettings;
