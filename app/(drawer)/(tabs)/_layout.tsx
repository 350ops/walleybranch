import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

import useThemeColors from '../../contexts/ThemeColors';

export default function Layout() {
  const { isDark } = useThemeColors();
  return (
    <NativeTabs
      blurEffect={isDark ? "systemChromeMaterialDark" : "systemChromeMaterialLight"}
      backgroundColor="transparent"
      shadowColor="transparent"
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="cards">
        <Label>Cards</Label>
        <Icon sf="creditcard.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="recipients">
        <Label>Recipients</Label>
        <Icon sf="person.2.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="payments">
        <Label>Payments</Label>
        <Icon sf="arrow.up.arrow.down" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
