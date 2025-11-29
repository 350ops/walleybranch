import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useThemeColors from '@/contexts/ThemeColors';
import Input from '@/components/forms/Input';
import { Button } from '@/components/Button';
import useProfile from '@/hooks/useProfile';

export default function ProfileSetupScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const colors = useThemeColors();
  const { updateProfile } = useProfile();

  const handleSave = async () => {
    if (!fullName || !username) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        full_name: fullName,
        username: username,
      });
      router.replace('/');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, padding: 24 }}>
        <View className="flex-1 justify-center">
          <Text style={{ color: colors.text }} className="mb-2 text-3xl font-bold">
            Setup Profile
          </Text>
          <Text style={{ color: colors.secondary }} className="mb-8 text-lg">
            Tell us a bit about yourself
          </Text>

          <Input
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
            autoCapitalize="words"
          />

          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="johndoe"
            autoCapitalize="none"
          />

          <Button
            title="Save Profile"
            onPress={handleSave}
            loading={isLoading}
            size="large"
            className="mt-8 !bg-highlight"
            rounded="full"
            textClassName="!text-black"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
