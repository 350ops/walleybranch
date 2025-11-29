import React, { useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import { Chip } from '@/components/Chip';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';
import useNotifications from '@/hooks/useNotifications';
import { formatRelativeTime } from '@/utils/format';
import SkeletonLoader from '@/components/SkeletonLoader';

type NotificationFilter = 'all' | 'transaction' | 'security' | 'payment' | 'transfer' | 'account';

const FILTERS: { label: string; value: NotificationFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Payments', value: 'payment' },
  { label: 'Transactions', value: 'transaction' },
  { label: 'Security', value: 'security' },
  { label: 'Transfers', value: 'transfer' },
  { label: 'Account', value: 'account' },
];

const iconMap: Record<string, string> = {
  payment: 'CreditCard',
  transaction: 'ArrowUpCircle',
  security: 'Shield',
  transfer: 'Send',
  account: 'AlertCircle',
};

export default function NotificationsScreen() {
  const [selectedType, setSelectedType] = useState<NotificationFilter>('all');
  const { notifications, isLoading, markAsRead } = useNotifications();

  const filteredNotifications = useMemo(() => {
    if (selectedType === 'all') return notifications;
    return notifications.filter((notification) => notification.type === selectedType);
  }, [notifications, selectedType]);

  const handlePressNotification = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.warn('Failed to mark notification read', error);
    }
  };

  return (
    <>
      <Header showBackButton title="Notifications" />
      <ThemedScroller className="pt-4">
        <View className="mb-6 flex-row flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              isSelected={selectedType === filter.value}
              onPress={() => setSelectedType(filter.value)}
            />
          ))}
        </View>

        {isLoading ? (
          <SkeletonLoader />
        ) : filteredNotifications.length === 0 ? (
          <ThemedText className="opacity-60">No notifications to show.</ThemedText>
        ) : (
          filteredNotifications.map((notification) => (
            <Pressable
              key={notification.id}
              onPress={() => handlePressNotification(notification.id)}
              className={`border-border/40 flex-row items-center border-b py-4 ${notification.read ? 'opacity-60' : ''}`}>
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <Icon name={(iconMap[notification.type || ''] as any) || 'Bell'} size={22} />
              </View>
              <View className="flex-1">
                <ThemedText className="text-base font-semibold">{notification.title}</ThemedText>
                {notification.body && (
                  <ThemedText className="mt-1 text-sm opacity-60">{notification.body}</ThemedText>
                )}
                <ThemedText className="mt-1 text-xs opacity-50">
                  {formatRelativeTime(notification.created_at)}
                </ThemedText>
              </View>
            </Pressable>
          ))
        )}
      </ThemedScroller>
    </>
  );
}
