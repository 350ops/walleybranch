import { View } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { useThemeColors } from "@/app/contexts/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import { TransactionItem } from '@/components/TransactionItem';
import { Chip } from '@/components/Chip';

type FilterType = 'all' | 'incoming' | 'outgoing';

interface Transaction {
    id: string;
    title: string;
    amount: string;
    method: string;
    time: string;
    date: string;
    isIncome: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
    avatar?: any;
}

const transactionsData: Transaction[] = [
    // Today
    {
        id: '1',
        title: 'Sarah Miller',
        amount: '+$250.00',
        method: 'Bank Transfer',
        time: '10 minutes ago',
        date: 'Today',
        isIncome: true,
        avatar: require('@/assets/img/user-1.jpg')
    },
    {
        id: '2',
        title: 'Starbucks',
        amount: '-$8.50',
        method: 'Debit Card',
        time: '2 hours ago',
        date: 'Today',
        isIncome: false,
        icon: 'enviromento'
    },
    {
        id: '3',
        title: 'Netflix',
        amount: '-$15.99',
        method: 'Monthly Subscription',
        time: '4 hours ago',
        date: 'Today',
        isIncome: false,
        icon: 'play'
    },
    {
        id: '4',
        title: 'Michael Chen',
        amount: '+$75.00',
        method: 'Split Payment',
        time: '6 hours ago',
        date: 'Today',
        isIncome: true,
        avatar: require('@/assets/img/user-2.jpg')
    },
    
    // Yesterday
    {
        id: '5',
        title: 'Amazon',
        amount: '-$89.99',
        method: 'Online Purchase',
        time: 'Yesterday 8:30 PM',
        date: 'Yesterday',
        isIncome: false,
        icon: 'amazon'
    },
    {
        id: '6',
        title: 'Salary Deposit',
        amount: '+$3,500.00',
        method: 'Direct Deposit',
        time: 'Yesterday 6:00 AM',
        date: 'Yesterday',
        isIncome: true,
        icon: 'bank'
    },
    {
        id: '7',
        title: 'Uber',
        amount: '-$24.50',
        method: 'Ride Payment',
        time: 'Yesterday 7:15 PM',
        date: 'Yesterday',
        isIncome: false,
        icon: 'car'
    },
    {
        id: '8',
        title: 'Jessica Alma',
        amount: '-$120.00',
        method: 'Money Transfer',
        time: 'Yesterday 2:30 PM',
        date: 'Yesterday',
        isIncome: false,
        avatar: require('@/assets/img/user-3.jpg')
    },
    
    // August 7, 2024
    {
        id: '9',
        title: 'Apple Store',
        amount: '-$359.00',
        method: 'Apple Pay',
        time: 'Aug 7, 3:45 PM',
        date: 'August 7, 2025',
        isIncome: false,
        icon: 'apple'
    },
    {
        id: '10',
        title: 'Google Pay',
        amount: '-$51.00',
        method: 'App Purchase',
        time: 'Aug 7, 11:20 AM',
        date: 'August 7, 2025',
        isIncome: false,
        icon: 'google'
    },
    {
        id: '11',
        title: 'Alex Thompson',
        amount: '+$45.00',
        method: 'Friend Payment',
        time: 'Aug 7, 9:15 AM',
        date: 'August 7, 2025',
        isIncome: true,
        avatar: require('@/assets/img/user-4.jpg')
    },
    
    // August 6, 2024
    {
        id: '12',
        title: 'Grocery Store',
        amount: '-$127.34',
        method: 'Debit Card',
        time: 'Aug 6, 6:30 PM',
        date: 'August 6, 2025',
        isIncome: false,
        icon: 'shoppingcart'
    },
    {
        id: '13',
        title: 'Cashback Reward',
        amount: '+$12.50',
        method: 'Credit Card Reward',
        time: 'Aug 6, 12:00 PM',
        date: 'August 6, 2025',
        isIncome: true,
        icon: 'gift'
    },
    {
        id: '14',
        title: 'Gas Station',
        amount: '-$65.00',
        method: 'Fuel Purchase',
        time: 'Aug 6, 8:45 AM',
        date: 'August 6, 2025',
        isIncome: false,
        icon: 'car'
    }
];

export default function TransactionsScreen() {
    const colors = useThemeColors();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

    // Filter transactions based on selected filter
    const filteredTransactions = transactionsData.filter(transaction => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'incoming') return transaction.isIncome;
        if (selectedFilter === 'outgoing') return !transaction.isIncome;
        return true;
    });

    // Group transactions by date
    const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {} as Record<string, Transaction[]>);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className='pt-4'>
                <Section title="Transactions" titleSize='4xl' className='mt-8 mb-4' />
                <View className="flex-row gap-1 mb-10">
                    <Chip
                        label="All"
                        size='lg'
                        isSelected={selectedFilter === 'all'}
                        onPress={() => setSelectedFilter('all')}
                    />
                    <Chip
                        label="Incoming"
                        size='lg'
                        isSelected={selectedFilter === 'incoming'}
                        onPress={() => setSelectedFilter('incoming')}
                    />
                    <Chip
                        label="Outgoing"
                        size='lg'
                        isSelected={selectedFilter === 'outgoing'}
                        onPress={() => setSelectedFilter('outgoing')}
                    />
                </View>

                {Object.entries(groupedTransactions).map(([date, transactions]) => (
                    <View key={date} className="mb-6">
                        <ThemedText className="text-lg font-semibold mb-3 text-text opacity-80">
                            {date}
                        </ThemedText>
                        {transactions.map((transaction) => (
                            <TransactionItem
                                key={transaction.id}
                                title={transaction.title}
                                amount={transaction.amount}
                                method={transaction.method}
                                time={transaction.time}
                                isIncome={transaction.isIncome}
                                icon={transaction.icon}
                                avatar={transaction.avatar}
                            />
                        ))}
                    </View>
                ))}
            </ThemedScroller>
        </>
    );
}



