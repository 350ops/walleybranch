import { useMemo } from 'react';
import { useSupabaseData, type Notification } from '@/contexts/DataContext';

type UseNotificationsResult = {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  refresh: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
};

export const useNotifications = (): UseNotificationsResult => {
  const { notifications, loading, refreshNotifications, markNotificationAsRead } =
    useSupabaseData();

  const unreadCount = useMemo(
    () => notifications.filter((notif) => !notif.read).length,
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    isLoading: loading.notifications,
    refresh: refreshNotifications,
    markAsRead: markNotificationAsRead,
  };
};

export default useNotifications;
