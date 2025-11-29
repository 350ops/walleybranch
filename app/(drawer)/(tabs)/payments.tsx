import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { AnimatedBarChart } from '@/components/AnimatedBarChart';
import AnimatedView from '@/components/AnimatedView';
import Header from '@/components/Header';
import ListLink from '@/components/ListLink';
import Section from '@/components/layout/Section';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { useSupabaseData } from '@/contexts/DataContext';
import useTransactions from '@/hooks/useTransactions';
import { formatCurrency } from '@/utils/format';

export default function PaymentsScreen() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { monthlyTotals, spentThisMonth, transactions } = useTransactions();
  const { account } = useSupabaseData();
  const currency = account?.currency ?? 'USD';

  const chartData = useMemo(() => {
    const data = monthlyTotals.length
      ? monthlyTotals
      : [
          { month: 'Jan', total: 0 },
          { month: 'Feb', total: 0 },
          { month: 'Mar', total: 0 },
          { month: 'Apr', total: 0 },
          { month: 'May', total: 0 },
          { month: 'Jun', total: 0 },
        ];

    return data.map((item, index) => ({
      month: item.month,
      value: Number(item.total ?? 0),
      isHighlighted: index === data.length - 1,
    }));
  }, [monthlyTotals]);

  useFocusEffect(
    useCallback(() => {
      // Only animate on first visit
      if (!hasAnimated) {
        setShouldAnimate(true);
        setHasAnimated(true);
      }
    }, [hasAnimated])
  );

  return (
    <>
      <Header className="pt-10" />
      <AnimatedView animation="scaleIn" className="flex-1 bg-background" duration={300}>
        <ThemedScroller>
          <Section title="Payments" titleSize="4xl" className="mb-4 mt-10" />
          <ThemedText className="mb-2 text-base opacity-70">
            {transactions.length ? `${transactions.length} payments logged` : 'No payments yet'}
          </ThemedText>
          <View className="relative h-[300px] w-full">
            <AnimatedBarChart
              data={chartData}
              animate={shouldAnimate}
              valueFormatter={(value) => formatCurrency(value, currency)}
            />
          </View>
          <View className="mb-4 flex-row justify-between px-4">
            <ThemedText className="text-lg font-semibold">
              Spent this month: {formatCurrency(spentThisMonth, currency)}
            </ThemedText>
          </View>
          <ListLink
            title="Direct debits"
            description="1 active"
            icon="RotateCw"
            href="/screens/direct-debits"
            showChevron
          />
          <ListLink
            title="Recurring card payments"
            description="10 active"
            icon="RotateCw"
            href="/screens/reccuring"
            showChevron
          />
          <ListLink
            title="Scheduled transfers"
            description="Set up a transfer to send at a later date"
            icon="Calendar"
            href="/screens/scheduled-payments"
            showChevron
          />
          <ListLink
            title="Payement requests"
            description="Create and manage payments you've requested"
            icon="HandCoins"
            href="/screens/payment-requests"
            showChevron
          />

          <Section title="Payment tools" className="mt-8">
            <ListLink
              title="Your account"
              description="@johndoe"
              icon="RotateCw"
              href="/screens/profile"
              showChevron
            />
            <ListLink
              href="/screens/link"
              title="Send via  link"
              description="Create and manage links"
              icon="Link2"
              showChevron
            />
          </Section>
        </ThemedScroller>
      </AnimatedView>
    </>
  );
}
