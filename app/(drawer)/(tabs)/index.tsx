import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Link } from 'expo-router';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { CardPreview } from '@/components/CardPreview';
import { CardScroller } from '@/components/CardScroller';
import Header, { HeaderIcon } from '@/components/Header';
import Section from '@/components/layout/Section';
import StripeCheckout from '@/components/StripeCheckout';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { TransactionItem } from '@/components/TransactionItem';
import { useSupabaseData } from '@/contexts/DataContext';
import useCards from '@/hooks/useCards';
import useNotifications from '@/hooks/useNotifications';
import useProfile from '@/hooks/useProfile';
import useTransactions from '@/hooks/useTransactions';
import { formatCurrency, formatRelativeTime } from '@/utils/format';

export default function HomeScreen() {
  const { profile } = useProfile();
  const { cards } = useCards();
  const { account, setBalance, isHydrated } = useSupabaseData();
  const { recentTransactions, monthlyTotals, spentThisMonth } = useTransactions();
  const { unreadCount } = useNotifications();

  React.useEffect(() => {
    if (isHydrated && (!account || account.balance !== 32500)) {
      setBalance(32500);
    }
  }, [account, setBalance, isHydrated]);

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
          <View className="mt-10 items-center justify-center p-global py-10">
            <ThemedText className="mb-2 text-base opacity-70">Total balance</ThemedText>
            <ThemedText className="text-5xl font-bold">
              {account ? formatCurrency(account.balance, account.currency) : '$0.00'}
            </ThemedText>
            <View className="mt-4 flex-row items-center rounded-full bg-lime-500/20 px-3 py-1">
              <Text className="text-sm font-semibold text-lime-600">
                {spentThisMonth > 0
                  ? `+${formatCurrency(spentThisMonth, account?.currency ?? 'USD')} this month`
                  : 'New user'}
              </Text>
            </View>
            <StripeCheckout />
          </View>

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
                    onSetDefault={() => { }}
                    onDelete={() => { }}
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
