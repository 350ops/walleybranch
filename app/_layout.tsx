import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { SupabaseDataProvider } from '@/contexts/DataContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import useThemeColors from '../contexts/ThemeColors';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function RootLayout() {
  const colors = useThemeColors();
  return (
    <GestureHandlerRootView
      className={`bg-background  ${Platform.OS === 'ios' ? 'pb-0 ' : ''}`}
      style={{ flex: 1 }}>
      <ThemeProvider>
        <StripeProvider
          publishableKey="pk_live_51QiAABDO4BRJvLH7ctaJuK2Hg3srajjDZhxijucRuHhA2RRjguQ1QxB5TL0XfnPINWX8hKtRpY5pZcZErgyI77As00NF3ZMijQ"
          merchantIdentifier="merchant.com.mmdev13.piper">
          <AuthProvider>
            <SupabaseDataProvider>
              <Stack
                screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}
              />
            </SupabaseDataProvider>
          </AuthProvider>
        </StripeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
