import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { authApi } from '@/lib/auth-api';
import * as ImagePicker from 'expo-image-picker';

import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Input from '@/components/forms/Input';
import Section from '@/components/layout/Section';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

export default function EditProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await authApi.getUserProfile();
      if (profile) {
        // Split full name into first and last name
        const names = (profile.full_name || '').split(' ');
        setFirstName(names[0] || '');
        setLastName(names.slice(1).join(' ') || '');
        setEmail(profile.email || '');
        setProfileImage(profile.avatar_url || null);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

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
      if (profileImage && (profileImage.startsWith('file://') || profileImage.startsWith('content://'))) {
        avatarUrl = await authApi.uploadProfileImage(profileImage);
      }

      const fullName = `${firstName} ${lastName}`.trim();
      await authApi.updateUserProfile({
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
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
      <Header showBackButton
        title="Profile Settings"
        rightComponents={[
          <Button
            title={isLoading ? "Saving..." : "Save changes"}
            onPress={handleSave}
            disabled={isLoading}
          />
        ]}
      />
      <ThemedScroller>

        <View className="items-center flex-row mb-8 my-14  rounded-2xl  w-[220px]">
          <TouchableOpacity
            onPress={pickImage}
            className="relative"
            activeOpacity={0.9}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-28 h-28 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-secondary items-center justify-center">
                <Icon name="Plus" size={25} className="text-light-subtext dark:text-dark-subtext" />
              </View>
            )}

          </TouchableOpacity>
          <View className='ml-4'>
            <Button variant='outline' title={profileImage ? 'Change photo' : 'Upload photo'} className="text-sm text-light-subtext dark:text-dark-subtext" onPress={pickImage} />

            {profileImage && (
              <Button
                className='mt-2'
                title="Remove photo"
                variant="outline"
                onPress={() => setProfileImage(null)}
              />
            )}
          </View>
        </View>
        <Section titleSize='xl' className='pt-4 pb-8' title="Personal information" subtitle="Manage your personal information">
          <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            containerClassName='mt-8' />
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            containerClassName='flex-1'
            autoCapitalize="words" />

          <Input
            label="Email"
            value={email}
            editable={false} // Email usually shouldn't be editable directly here without re-verification
            keyboardType="email-address"
            autoCapitalize="none" />
        </Section>




      </ThemedScroller>
    </>
  );
}


