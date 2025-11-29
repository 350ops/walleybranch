import { View, Pressable } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Avatar from '@/components/Avatar';
import ListLink from '@/components/ListLink';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useCallback } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Icon from '@/components/Icon';
import Section from '@/components/layout/Section';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { useFocusEffect } from 'expo-router';
import useProfile from '@/hooks/useProfile';

export default function ProfileScreen() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { profile, refresh } = useProfile();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <>
      <Header showBackButton rightComponents={[<ThemeToggle />]} />
      <View className="flex-1">
        <ThemedScroller className="flex-1 pt-4">
          <View className=" mb-4 w-full items-center pb-10 pt-10">
            <Avatar
              src={
                profile?.avatar_url
                  ? { uri: profile.avatar_url }
                  : require('@/assets/img/user-3.jpg')
              }
              size="xxl"
            />
            <View className=" mt-4 items-center">
              <ThemedText className="text-4xl font-bold">{profile?.full_name || 'User'}</ThemedText>
              <ThemedText className="mt-1 text-base">Personal account</ThemedText>
            </View>
          </View>
          <SwitchAccount onPress={() => actionSheetRef.current?.show()} />
          <Section title="Your account" titleSize="2xl" className="mb-4 mt-10" />

          <ListLink title="Inbox" icon="Mail" href="/screens/notifications" />
          <ListLink title="Help" icon="HelpCircle" href="/screens/help" />
          <ListLink title="Statements and reports" icon="File" href="/screens/statements" />
          <Section title="Settings" titleSize="2xl" className="mb-4 mt-10" />
          <ListLink
            title="Profile"
            description="Manage your profile"
            icon="User"
            href="/screens/edit-profile"
          />
          <ListLink
            title="App settings"
            description="Notifications, language & limits"
            icon="Settings"
            href="/screens/settings"
          />
          <ListLink
            title="Notifications"
            description="Customize how you get updates"
            icon="Bell"
            href="/screens/notification-settings"
          />
          <ListLink
            title="Limits"
            description="Set your spending limits"
            icon="GaugeCircle"
            href="/screens/limits"
          />
          <ListLink
            title="Security"
            description="Manage your security settings"
            icon="Shield"
            href="/screens/security"
          />
          <ListLink
            title="Logout"
            description="Logout of your account"
            icon="LogOut"
            href="/screens/welcome"
          />
        </ThemedScroller>
      </View>

      <SwitchAccountDrawer ref={actionSheetRef} />
    </>
  );
}

const SwitchAccount = (props: { onPress: () => void }) => {
  return (
    <Pressable
      className="flex-row items-center  rounded-2xl bg-secondary p-6"
      onPress={props.onPress}>
      <View className="mr-5 flex-row items-center">
        <Avatar name="John Doe" size="sm" className="mb-4 border border-border" />
        <Avatar name="Ted Lasso" size="sm" className="-ml-4 mt-4 border border-border" />
      </View>
      <ThemedText className="text-lg font-semibold">Switch Account</ThemedText>

      <Icon name="ChevronRight" size={20} className="ml-auto" />
    </Pressable>
  );
};

const SwitchAccountDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheetThemed gestureEnabled ref={ref}>
      <View className="p-global">
        <ThemedText className="mb-4 text-2xl font-bold">Switch Account</ThemedText>
        <ProfileItem
          isSelected
          src={require('@/assets/img/user-3.jpg')}
          name="John Doe"
          label="Personal account"
        />
        <ProfileItem name="Tad Lasso" label="Business account" />
        <ProfileItem name="JD Studios" label="Business account" />
      </View>
    </ActionSheetThemed>
  );
});

const ProfileItem = (props: any) => {
  return (
    <Pressable className="flex-row items-center  rounded-2xl bg-secondary py-4">
      <View className="relative mr-4">
        <Avatar src={props.src} size="lg" name={props.name} className="border border-border" />
        {props.isSelected && (
          <Icon
            name="Check"
            color="white"
            size={14}
            strokeWidth={2}
            className="absolute bottom-0 right-0 h-7 w-7 rounded-full border-2 border-secondary bg-highlight"
          />
        )}
      </View>
      <View className="flex-1">
        <ThemedText className="text-xl font-semibold">{props.name}</ThemedText>
        <ThemedText className="text-sm">{props.label}</ThemedText>
      </View>
      <Icon name="ChevronRight" size={20} className="opacity-40" />
    </Pressable>
  );
};
