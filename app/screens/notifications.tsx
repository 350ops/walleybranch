import { View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import { Chip } from '@/components/Chip';
import SkeletonLoader from '@/components/SkeletonLoader';
import List from '@/components/layout/List';
import ListItem from '@/components/layout/ListItem';
import { Link } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import TabScreenWrapper from '@/components/TabScreenWrapper';
import Icon, { IconName } from '@/components/Icon';

type NotificationType = 'transaction' | 'security' | 'payment' | 'transfer' | 'account' | 'all';

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: IconName;
  user?: User; // Optional user field for notifications from other users
}

export default function NotificationsScreen() {
  const [selectedType, setSelectedType] = useState<NotificationType>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);

  // Define notifications data outside useEffect to avoid re-creation
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'transaction',
      title: 'Payment Received',
      message: 'You received $250.00 from Jessica Alma',
      time: '2 min ago',
      read: false,
      icon: 'ArrowDownCircle'
    },
    {
      id: 2,
      type: 'security',
      title: 'Login Alert',
      message: 'New device logged into your account from New York',
      time: '1 hour ago',
      read: false,
      icon: 'Shield'
    },
    {
      id: 3,
      type: 'transfer',
      title: 'Transfer Completed',
      message: 'Your transfer of $1,200.00 to Michael Chen has been completed',
      time: '2 hours ago',
      read: true,
      icon: 'Send',
      user: {
        id: 102,
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: 4,
      type: 'payment',
      title: 'Card Payment',
      message: 'Payment of $89.99 at Amazon was successful',
      time: '3 hours ago',
      read: false,
      icon: 'CreditCard'
    },
    {
      id: 5,
      type: 'account',
      title: 'Monthly Statement Ready',
      message: 'Your December statement is now available for download',
      time: '4 hours ago',
      read: true,
      icon: 'FileText'
    },
    {
      id: 6,
      type: 'transaction',
      title: 'Direct Deposit',
      message: 'Salary deposit of $3,500.00 from Acme Corp has been processed',
      time: '1 day ago',
      read: true,
      icon: 'Banknote'
    },
    {
      id: 7,
      type: 'security',
      title: 'Password Changed',
      message: 'Your account password was successfully updated',
      time: '1 day ago',
      read: false,
      icon: 'Lock'
    },
    {
      id: 8,
      type: 'payment',
      title: 'Subscription Payment',
      message: 'Monthly subscription to Netflix ($15.99) was charged',
      time: '2 days ago',
      read: true,
      icon: 'Calendar'
    },
    {
      id: 9,
      type: 'account',
      title: 'Account Verification',
      message: 'Your identity verification has been approved',
      time: '2 days ago',
      read: true,
      icon: 'CheckCircle'
    },
    {
      id: 10,
      type: 'transfer',
      title: 'Transfer Request',
      message: 'Sarah Miller requested $75.00 for dinner split',
      time: '3 days ago',
      read: false,
      icon: 'Users',
      user: {
        id: 101,
        name: 'Sarah Miller',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    },
    {
      id: 11,
      type: 'security',
      title: 'Two-Factor Authentication',
      message: 'Two-factor authentication has been enabled for your account',
      time: '4 days ago',
      read: true,
      icon: 'Smartphone'
    },
    {
      id: 12,
      type: 'transaction',
      title: 'Cashback Earned',
      message: 'You earned $12.50 cashback on your recent purchases',
      time: '5 days ago',
      read: true,
      icon: 'Gift'
    },
    {
      id: 13,
      type: 'account',
      title: 'Spending Limit Alert',
      message: 'You\'ve reached 80% of your monthly spending limit',
      time: '6 days ago',
      read: true,
      icon: 'AlertTriangle'
    },
    {
      id: 14,
      type: 'payment',
      title: 'Failed Payment',
      message: 'Payment to Electric Company failed. Please update your payment method',
      time: '1 week ago',
      read: false,
      icon: 'AlertCircle'
    }
  ];

  // Load notifications data with proper useEffect
  useEffect(() => {
    console.log("Loading notifications...");
    
    // Simulate API call with a delay
    const loadData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set notifications data
        setNotificationsData(notifications);
        
        // Turn off loading state
        setIsLoading(false);
        console.log("Notifications loaded successfully");
      } catch (error) {
        console.error("Error loading notifications:", error);
        setIsLoading(false); // Ensure loading state is turned off even if there's an error
      }
    };
    
    loadData();
    
    // Cleanup function
    return () => {
      console.log("Notifications component unmounted");
    };
  }, []);  // Empty dependency array means this runs once on mount

  // Filter notifications based on selected type
  const filteredNotifications = notificationsData.filter(notification =>
    selectedType === 'all' ? true : notification.type === selectedType
  );

  

  return (
    <>
      <Header 
        showBackButton 
        title="Notifications" 
      />
      <View className="flex-1 bg-background dark:bg-dark-primary">
        <View className="p-4 flex-row gap-1">
          <Chip
            label="All"
            isSelected={selectedType === 'all'}
            onPress={() => setSelectedType('all')}
          />
          <Chip
            label="Transactions"
            isSelected={selectedType === 'transaction'}
            onPress={() => setSelectedType('transaction')}
          />
          <Chip
            label="Security"
            isSelected={selectedType === 'security'}
            onPress={() => setSelectedType('security')}
          />
          <Chip
            label="Payments"
            isSelected={selectedType === 'payment'}
            onPress={() => setSelectedType('payment')}
          />
          <Chip
            label="Transfers"
            isSelected={selectedType === 'transfer'}
            onPress={() => setSelectedType('transfer')}
          />
          <Chip
            label="Account"
            isSelected={selectedType === 'account'}
            onPress={() => setSelectedType('account')}
          />
        </View>

        <ThemedScroller className='!px-0'>
          {isLoading ? (
            <View className="p-4">
              <SkeletonLoader variant="list" count={6} />
            </View>
          ) : (
            <List variant="divided">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <View key={notification.id}>
                    {renderNotification(notification)}
                  </View>
                ))
              ) : (
                <View className="p-8 items-center">
                  <ThemedText>No notifications found</ThemedText>
                </View>
              )}
            </List>
          )}
        </ThemedScroller>
      </View>
    </>
  );
}

export const renderNotification = (notification: Notification) => (

    <ListItem
      leading={
        notification.user ? (
          <Image
            source={{ uri: notification.user.avatar }}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <View className="bg-secondary /30 dark:bg-dark-subtext/30 w-10 h-10 rounded-full items-center justify-center">
            <Icon name={notification.icon} size={20} />
          </View>
        )
      }
      title={
        <ThemedText className="font-bold">{notification.title}</ThemedText>
      }
      subtitle={notification.message}
      trailing={
        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
          {notification.time}
        </ThemedText>
      }
      className={`p-4 ${!notification.read ? '' : ''}`}
    />

);