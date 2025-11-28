import { useThemeColors } from 'app/contexts/ThemeColors';
import { TabButton } from 'components/TabButton';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionTab from '@/components/ActionTab';

export default function Layout() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{
          alignItems: 'center',
          backgroundColor: colors.secondary,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Home Tab */}
        <TabTrigger
          name="index"
          href="/"
          asChild
        >
          <TabButton labelAnimated={true} icon="Home">Home</TabButton>
        </TabTrigger>

        <TabTrigger
          name="cards"
          href="/cards"
          asChild
        >
          <TabButton labelAnimated={true} icon="CreditCard">Cards</TabButton>
        </TabTrigger>

      
        <TabTrigger
          name="recipients"
          href="/recipients"
          asChild
        >
          <TabButton labelAnimated={true} icon="Users">Recipients</TabButton>
        </TabTrigger>

        <TabTrigger
          name="payments"
          href="/payments"
          asChild
        >
          <TabButton labelAnimated={true} icon="ArrowDownUp">Payments</TabButton>
        </TabTrigger>


      </TabList>
    </Tabs>
  );
}
