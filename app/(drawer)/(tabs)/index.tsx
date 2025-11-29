import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Link } from 'expo-router';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { BalanceChart } from '@/components/BalanceChart';
import { CardPreview } from '@/components/CardPreview';
import { CardScroller } from '@/components/CardScroller';
import Header, { HeaderIcon } from '@/components/Header';
import Section from '@/components/layout/Section';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { TransactionItem } from '@/components/TransactionItem';
import { useSupabaseData } from '@/contexts/DataContext';
import useCards from '@/hooks/useCards';
import useNotifications from '@/hooks/useNotifications';
import useProfile from '@/hooks/useProfile';
import useTransactions from '@/hooks/useTransactions';
import { formatCurrency, formatRelativeTime } from '@/utils/format';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile } = useProfile();
  const { cards } = useCards();
  const { account } = useSupabaseData();
  const { recentTransactions, monthlyTotals, spentThisMonth } = useTransactions();
  const { unreadCount } = useNotifications();

  const animatedWidth = useSharedValue(0);

  useFocusEffect(
    React.useCallback(() => {
      animatedWidth.value = 0;
      animatedWidth.value = withTiming(width, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      });
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));
  return (
    <>
      <Header
        className="bg-background"
        leftComponent={
          <Avatar
            src={profile?.avatar_url || undefined}
            name={profile?.full_name || profile?.username || 'User'}
            size="sm"
            link="/screens/profile"
            border
          />
        }
        rightComponents={[
          <HeaderIcon
            key="bell"
            icon="Bell"
            hasBadge={unreadCount > 0}
            href="/screens/notifications"
          />,
        ]}
      />
      <AnimatedView animation="scaleIn" className="flex-1 bg-background" duration={300}>
        <ThemedScroller className="flex-1 bg-background !px-0">
          <View className="mt-global p-global">
            <ThemedText className="mb-1 text-sm">Total balance</ThemedText>
            <View className="flex-row items-center">
              <ThemedText className="text-4xl font-bold">
                {account ? formatCurrency(account.balance, account.currency) : '$0.00'}
              </ThemedText>
              <Text className="ml-4 rounded-full bg-lime-500 px-2 py-1 text-sm font-semibold text-white">
                {spentThisMonth > 0
                  ? `${formatCurrency(spentThisMonth, account?.currency ?? 'USD')} this month`
                  : 'New user'}
              </Text>
            </View>
          </View>
          <Animated.View style={animatedStyle} className="overflow-hidden">
            <BalanceChart
              data={monthlyTotals.slice(-10).map((item) => item.total)}
              labels={monthlyTotals.slice(-10).map((item) => item.month)}
            />
          </Animated.View>

          <Section title="Cards" className="mt-4 px-global">
            <CardScroller space={10}>
              {cards.length === 0 ? (
                <Link asChild href="/screens/add-card">
                  <Pressable className="h-[140px] w-[220px] items-center justify-center rounded-3xl border border-border bg-secondary">
                    <ThemedText className="text-lg font-semibold">Add your first card</ThemedText>
                  </Pressable>
                </Link>
              ) : (
                cards.map((card) => (
                  <CardPreview
                    key={card.id}
                    cardNumber={card.card_number_last4}
                    expiryDate={`${card.expiry_month.toString().padStart(2, '0')}/${card.expiry_year}`}
                    brand={card.card_brand ?? 'Visa'}
                    onSetDefault={() => {}}
                    onDelete={() => {}}
                  />
                ))
              )}
            </CardScroller>
          </Section>

          <Section
            title="Transactions"
            link="/screens/transactions"
            linkText="See all"
            titleSize="2xl"
            className="mt-10 px-global ">
            {recentTransactions.length === 0 ? (
              <ThemedText className="opacity-70">
                No transactions yet. Once you start spending, they will appear here.
              </ThemedText>
            ) : (
              recentTransactions.map((transaction) => {
                const amountValue = Number(transaction.amount || 0);
                return (
                  <TransactionItem
                    key={transaction.id}
                    title={transaction.merchant_name}
                    amount={formatCurrency(amountValue, account?.currency ?? 'USD')}
                    method={transaction.payment_method || transaction.category || 'Card payment'}
                    time={formatRelativeTime(transaction.created_at)}
                    isIncome={amountValue >= 0}
                  />
                );
              })
            )}
          </Section>
        </ThemedScroller>
      </AnimatedView>
    </>
  );
}
