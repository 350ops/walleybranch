import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';
import Toggle from '@/components/Toggle';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import { Button } from '@/components/Button';
import ThemedText from '@/components/ThemedText';
import useUserSettings from '@/hooks/useUserSettings';

const THEME_OPTIONS = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
];

export default function SettingsScreen() {
  const { settings, updateSettings, isLoading } = useUserSettings();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [themePreference, setThemePreference] = useState('system');
  const [language, setLanguage] = useState('en');
  const [spendingLimit, setSpendingLimit] = useState('');
  const [isSavingLimit, setIsSavingLimit] = useState(false);

  useEffect(() => {
    if (settings) {
      setNotificationsEnabled(settings.notifications_enabled);
      setBiometricEnabled(settings.biometric_enabled);
      setWeeklyDigest(settings.weekly_digest);
      setThemePreference(settings.theme);
      setLanguage(settings.language);
      setSpendingLimit(settings.spending_limit ? String(settings.spending_limit) : '');
    }
  }, [settings]);

  const handleToggle = async (
    key: 'notifications_enabled' | 'biometric_enabled' | 'weekly_digest',
    value: boolean
  ) => {
    try {
      if (key === 'notifications_enabled') setNotificationsEnabled(value);
      if (key === 'biometric_enabled') setBiometricEnabled(value);
      if (key === 'weekly_digest') setWeeklyDigest(value);
      await updateSettings({ [key]: value });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Unable to update settings');
    }
  };

  const handleSelectChange = async (key: 'theme' | 'language', value: string) => {
    try {
      if (key === 'theme') setThemePreference(value);
      if (key === 'language') setLanguage(value);
      await updateSettings({ [key]: value });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Unable to update settings');
    }
  };

  const handleSaveLimit = async () => {
    const numericValue = spendingLimit ? parseFloat(spendingLimit) : null;
    if (spendingLimit && Number.isNaN(Number(numericValue))) {
      Alert.alert('Invalid limit', 'Please enter a valid number');
      return;
    }
    setIsSavingLimit(true);
    try {
      await updateSettings({ spending_limit: numericValue ?? null });
      Alert.alert('Updated', 'Spending limit saved');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Unable to save limit');
    } finally {
      setIsSavingLimit(false);
    }
  };

  return (
    <>
      <Header showBackButton title="Settings" />
      <ThemedScroller>
        <Section title="Notifications" className="mt-6">
          <SettingsRow
            title="Push notifications"
            description="Get instant updates about your account"
            action={
              <Toggle
                value={notificationsEnabled}
                onChange={(value) => handleToggle('notifications_enabled', value)}
              />
            }
          />
          <SettingsRow
            title="Weekly digest"
            description="Summary email with weekly highlights"
            action={
              <Toggle
                value={weeklyDigest}
                onChange={(value) => handleToggle('weekly_digest', value)}
              />
            }
          />
        </Section>

        <Section title="Security" className="mt-10">
          <SettingsRow
            title="Biometric login"
            description="Use Face ID / Touch ID to login"
            action={
              <Toggle
                value={biometricEnabled}
                onChange={(value) => handleToggle('biometric_enabled', value)}
              />
            }
          />
        </Section>

        <Section title="Preferences" className="mt-10">
          <Select
            label="Theme"
            options={THEME_OPTIONS}
            value={themePreference}
            onChange={(value) => handleSelectChange('theme', String(value))}
            containerClassName="mb-4"
          />
          <Select
            label="Language"
            options={LANGUAGE_OPTIONS}
            value={language}
            onChange={(value) => handleSelectChange('language', String(value))}
          />
        </Section>

        <Section title="Spending" className="mt-10">
          <Input
            label="Monthly spending limit"
            value={spendingLimit}
            onChangeText={setSpendingLimit}
            placeholder="2000"
            keyboardType="numeric"
          />
          <Button
            title={isSavingLimit ? 'Saving...' : 'Save limit'}
            onPress={handleSaveLimit}
            disabled={isSavingLimit}
          />
        </Section>

        {isLoading && (
          <View className="mt-6">
            <ThemedText className="opacity-60">Syncing settings...</ThemedText>
          </View>
        )}
      </ThemedScroller>
    </>
  );
}

const SettingsRow = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action: React.ReactNode;
}) => {
  return (
    <View className="flex-row items-center justify-between py-4">
      <View className="flex-1 pr-4">
        <ThemedText className="text-base font-semibold">{title}</ThemedText>
        {description && <ThemedText className="mt-1 text-sm opacity-60">{description}</ThemedText>}
      </View>
      {action}
    </View>
  );
};
