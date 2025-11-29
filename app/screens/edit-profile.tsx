import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Input from '@/components/forms/Input';
import Section from '@/components/layout/Section';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import useProfile from '@/hooks/useProfile';
import useAuthSession from '@/hooks/useAuthSession';
import { authApi } from '@/lib/auth-api';

export default function EditProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile, updateProfile } = useProfile();
  const { user } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      const names = (profile.full_name || '').trim().split(' ');
      setFirstName(names[0] || '');
      setLastName(names.slice(1).join(' ') || '');
      setEmail(user?.email || '');
      setProfileImage(profile.avatar_url || null);
    }
  }, [profile, user?.email]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let avatarUrl = profileImage;

      // If profileImage is a local URI (starts with file://), upload it
      if (
        profileImage &&
        (profileImage.startsWith('file://') || profileImage.startsWith('content://'))
      ) {
        avatarUrl = await authApi.uploadProfileImage(profileImage);
      }

      const fullName = `${firstName} ${lastName}`.trim();
      await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl,
      });
      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        showBackButton
        title="Profile Settings"
        rightComponents={[
          <Button
            title={isLoading ? 'Saving...' : 'Save changes'}
            onPress={handleSave}
            disabled={isLoading}
          />,
        ]}
      />
      <ThemedScroller>
        <View className="my-14 mb-8 w-[220px] flex-row  items-center  rounded-2xl">
          <TouchableOpacity onPress={pickImage} className="relative" activeOpacity={0.9}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} className="h-28 w-28 rounded-full" />
            ) : (
              <View className="h-24 w-24 items-center justify-center rounded-full bg-secondary">
                <Icon name="Plus" size={25} className="text-light-subtext dark:text-dark-subtext" />
              </View>
            )}
          </TouchableOpacity>
          <View className="ml-4">
            <Button
              variant="outline"
              title={profileImage ? 'Change photo' : 'Upload photo'}
              className="text-light-subtext dark:text-dark-subtext text-sm"
              onPress={pickImage}
            />

            {profileImage && (
              <Button
                className="mt-2"
                title="Remove photo"
                variant="outline"
                onPress={() => setProfileImage(null)}
              />
            )}
          </View>
        </View>
        <Section
          titleSize="xl"
          className="pb-8 pt-4"
          title="Personal information"
          subtitle="Manage your personal information">
          <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            containerClassName="mt-8"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            containerClassName="flex-1"
            autoCapitalize="words"
          />

          <Input
            label="Email"
            value={email}
            editable={false} // Email usually shouldn't be editable directly here without re-verification
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Section>
      </ThemedScroller>
    </>
  );
}
