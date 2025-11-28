import { View, TouchableOpacity, Image } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { AntDesign } from "@expo/vector-icons";
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import { Chip } from '@/components/Chip';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';

type FilterType = 'all' | 'upcoming' | 'completed';

interface ScheduledPayment {
    id: string;
    recipientName: string;
    amount: string;
    description: string;
    scheduledDate: string;
    status: 'upcoming' | 'completed' | 'failed';
    avatar?: any;
    frequency?: 'once' | 'weekly' | 'monthly';
}

const scheduledPaymentsData: ScheduledPayment[] = [
    // Upcoming Payments
    {
        id: '1',
        recipientName: 'Mom',
        amount: '$500.00',
        description: 'Monthly allowance',
        scheduledDate: 'Feb 1, 2025',
        status: 'upcoming',
        avatar: require('@/assets/img/user-1.jpg'),
        frequency: 'monthly'
    },
    {
        id: '2',
        recipientName: 'Sarah Miller',
        amount: '$250.00',
        description: 'Rent split payment',
        scheduledDate: 'Feb 3, 2025',
        status: 'upcoming',
        avatar: require('@/assets/img/user-2.jpg'),
        frequency: 'monthly'
    },
    {
        id: '3',
        recipientName: 'Electric Company',
        amount: '$85.40',
        description: 'Electricity bill',
        scheduledDate: 'Feb 5, 2025',
        status: 'upcoming',
        frequency: 'monthly'
    },
    {
        id: '4',
        recipientName: 'Michael Chen',
        amount: '$120.00',
        description: 'Birthday gift contribution',
        scheduledDate: 'Feb 8, 2025',
        status: 'upcoming',
        avatar: require('@/assets/img/user-3.jpg'),
        frequency: 'once'
    },
    {
        id: '5',
        recipientName: 'Internet Provider',
        amount: '$59.99',
        description: 'Monthly internet bill',
        scheduledDate: 'Feb 10, 2025',
        status: 'upcoming',
        frequency: 'monthly'
    },

    // Completed Payments
    {
        id: '6',
        recipientName: 'Emma Wilson',
        amount: '$75.00',
        description: 'Dinner payment',
        scheduledDate: 'Jan 28, 2025',
        status: 'completed',
        avatar: require('@/assets/img/user-4.jpg'),
        frequency: 'once'
    },
    {
        id: '7',
        recipientName: 'Landlord',
        amount: '$1,200.00',
        description: 'Monthly rent',
        scheduledDate: 'Jan 25, 2025',
        status: 'completed',
        frequency: 'monthly'
    },
    {
        id: '8',
        recipientName: 'Credit Card',
        amount: '$450.00',
        description: 'Credit card payment',
        scheduledDate: 'Jan 22, 2025',
        status: 'completed',
        frequency: 'monthly'
    },

    // Failed Payment
    {
        id: '9',
        recipientName: 'Insurance Company',
        amount: '$125.00',
        description: 'Car insurance premium',
        scheduledDate: 'Jan 20, 2025',
        status: 'failed',
        frequency: 'monthly'
    }
];

export default function ScheduledPaymentsScreen() {
    const colors = useThemeColors();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

    // Filter scheduled payments based on selected filter
    const filteredPayments = scheduledPaymentsData.filter(payment => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'upcoming') return payment.status === 'upcoming';
        if (selectedFilter === 'completed') return payment.status === 'completed';
        return true;
    });

    // Group payments by status
    const groupedPayments = filteredPayments.reduce((groups, payment) => {
        const status = payment.status === 'upcoming' ? 'Upcoming Payments' :
            payment.status === 'completed' ? 'Completed' : 'Failed';
        if (!groups[status]) {
            groups[status] = [];
        }
        groups[status].push(payment);
        return groups;
    }, {} as Record<string, ScheduledPayment[]>);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className='pt-4 p-global'>
                <Section title="Scheduled Payments" titleSize='4xl' className='mt-8 mb-4' />
                <View className="flex-row gap-1 mb-10">
                    <Chip
                        label="All"
                        size='lg'
                        isSelected={selectedFilter === 'all'}
                        onPress={() => setSelectedFilter('all')}
                    />
                    <Chip
                        label="Upcoming"
                        size='lg'
                        isSelected={selectedFilter === 'upcoming'}
                        onPress={() => setSelectedFilter('upcoming')}
                    />
                    <Chip
                        label="Completed"
                        size='lg'
                        isSelected={selectedFilter === 'completed'}
                        onPress={() => setSelectedFilter('completed')}
                    />
                </View>

                {Object.entries(groupedPayments).map(([status, payments]) => (
                    <View key={status} className="mb-6">
                        <ThemedText className="text-lg font-semibold mb-3 text-text opacity-80">
                            {status}
                        </ThemedText>
                        {payments.map((payment) => (
                            <ScheduledPaymentItem
                                key={payment.id}
                                recipientName={payment.recipientName}
                                amount={payment.amount}
                                description={payment.description}
                                scheduledDate={payment.scheduledDate}
                                status={payment.status}
                                avatar={payment.avatar}
                                frequency={payment.frequency}
                            />
                        ))}
                    </View>
                ))}
            </ThemedScroller>
        </>
    );
}

interface ScheduledPaymentItemProps {
    recipientName: string;
    amount: string;
    description: string;
    scheduledDate: string;
    status: 'upcoming' | 'completed' | 'failed';
    avatar?: any;
    frequency?: 'once' | 'weekly' | 'monthly';
}

const ScheduledPaymentItem: React.FC<ScheduledPaymentItemProps> = ({
    recipientName,
    amount,
    description,
    scheduledDate,
    status,
    avatar,
    frequency
}) => {
    const colors = useThemeColors();

    const getStatusColor = () => {
        switch (status) {
            case 'upcoming': return 'bg-blue-500';
            case 'completed': return 'bg-green-500';
            case 'failed': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'upcoming': return `Scheduled: ${scheduledDate}`;
            case 'completed': return `Sent on ${scheduledDate}`;
            case 'failed': return `Failed on ${scheduledDate}`;
            default: return scheduledDate;
        }
    };

    const getFrequencyText = () => {
        if (!frequency || frequency === 'once') return 'One-time';
        return frequency.charAt(0).toUpperCase() + frequency.slice(1);
    };

    return (
        <TouchableOpacity activeOpacity={0.9} className="flex-row items-center py-6 border-b border-border">
            <View className="mr-4">

                <Avatar src={avatar} size='md' name={recipientName} />

            </View>

            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <ThemedText className="text-lg font-semibold">{recipientName}</ThemedText>
                    <ThemedText className="text-lg font-bold">{amount}</ThemedText>
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                        <ThemedText className="text-sm opacity-60" numberOfLines={1}>
                            {description}
                        </ThemedText>

                    </View>

                    <View className="flex-row items-center">

                        <ThemedText className="text-sm opacity-60 capitalize">
                            {status}
                        </ThemedText>
                        <View className={`w-2 h-2 rounded-full ml-2 ${getStatusColor()}`} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};



