import { View, TouchableOpacity } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { AntDesign } from "@expo/vector-icons";
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import { Chip } from '@/components/Chip';
import Icon from '@/components/Icon';

type FilterType = 'all' | 'active' | 'paused';

interface RecurringPayment {
    id: string;
    title: string;
    amount: string;
    frequency: string;
    nextPayment: string;
    cardLast4: string;
    isActive: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
    category: string;
}

const recurringPaymentsData: RecurringPayment[] = [
    // Streaming Services
    {
        id: '1',
        title: 'Netflix',
        amount: '$15.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 15, 2025',
        cardLast4: '4532',
        isActive: true,
        icon: 'play',
        category: 'Entertainment'
    },
    {
        id: '2',
        title: 'Spotify Premium',
        amount: '$9.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 8, 2025',
        cardLast4: '4532',
        isActive: true,
        icon: 'sound',
        category: 'Entertainment'
    },
    {
        id: '3',
        title: 'Disney Plus',
        amount: '$7.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 22, 2025',
        cardLast4: '1234',
        isActive: false,
        icon: 'play',
        category: 'Entertainment'
    },

    // Software & Apps
    {
        id: '4',
        title: 'Adobe Creative Cloud',
        amount: '$52.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 5, 2025',
        cardLast4: '4532',
        isActive: true,
        icon: 'edit',
        category: 'Software'
    },
    {
        id: '5',
        title: 'Microsoft 365',
        amount: '$6.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 12, 2025',
        cardLast4: '1234',
        isActive: true,
        icon: 'windows',
        category: 'Software'
    },
    {
        id: '6',
        title: 'Dropbox Plus',
        amount: '$9.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 18, 2025',
        cardLast4: '4532',
        isActive: true,
        icon: 'cloud',
        category: 'Software'
    },

    // Fitness & Health
    {
        id: '7',
        title: 'Gym Membership',
        amount: '$29.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 1, 2025',
        cardLast4: '1234',
        isActive: true,
        icon: 'heart',
        category: 'Health'
    },
    {
        id: '8',
        title: 'MyFitnessPal Premium',
        amount: '$9.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 25, 2025',
        cardLast4: '4532',
        isActive: false,
        icon: 'heart',
        category: 'Health'
    },

    // Utilities & Services
    {
        id: '9',
        title: 'Amazon Prime',
        amount: '$14.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 10, 2025',
        cardLast4: '1234',
        isActive: true,
        icon: 'amazon',
        category: 'Shopping'
    },
    {
        id: '10',
        title: 'iCloud Storage',
        amount: '$2.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 20, 2025',
        cardLast4: '4532',
        isActive: true,
        icon: 'cloud',
        category: 'Storage'
    }
];

export default function RecurringPaymentsScreen() {
    const colors = useThemeColors();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

    // Filter recurring payments based on selected filter
    const filteredPayments = recurringPaymentsData.filter(payment => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'active') return payment.isActive;
        if (selectedFilter === 'paused') return !payment.isActive;
        return true;
    });

    // Group payments by category
    const groupedPayments = filteredPayments.reduce((groups, payment) => {
        const category = payment.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(payment);
        return groups;
    }, {} as Record<string, RecurringPayment[]>);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className='pt-4 p-global'>
                <Section title="Recurring Payments" titleSize='4xl' className='mt-8 mb-4' />
                <View className="flex-row gap-1 mb-10">
                    <Chip
                        label="All"
                        size='lg'
                        isSelected={selectedFilter === 'all'}
                        onPress={() => setSelectedFilter('all')}
                    />
                    <Chip
                        label="Active"
                        size='lg'
                        isSelected={selectedFilter === 'active'}
                        onPress={() => setSelectedFilter('active')}
                    />
                    <Chip
                        label="Paused"
                        size='lg'
                        isSelected={selectedFilter === 'paused'}
                        onPress={() => setSelectedFilter('paused')}
                    />
                </View>

                {Object.entries(groupedPayments).map(([category, payments]) => (
                    <View key={category} className="mb-6">
                        <ThemedText className="text-lg font-semibold mb-3 text-text opacity-80">
                            {category}
                        </ThemedText>
                        {payments.map((payment) => (
                            <RecurringPaymentItem
                                key={payment.id}
                                title={payment.title}
                                amount={payment.amount}
                                frequency={payment.frequency}
                                nextPayment={payment.nextPayment}
                                cardLast4={payment.cardLast4}
                                isActive={payment.isActive}
                                icon={payment.icon}
                            />
                        ))}
                    </View>
                ))}
            </ThemedScroller>
        </>
    );
}

interface RecurringPaymentItemProps {
    title: string;
    amount: string;
    frequency: string;
    nextPayment: string;
    cardLast4: string;
    isActive: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
}

const RecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
    title,
    amount,
    frequency,
    nextPayment,
    cardLast4,
    isActive,
    icon
}) => {
    const colors = useThemeColors();

    return (
        <TouchableOpacity activeOpacity={0.9} className="flex-row items-center py-6 border-b border-border">
            <View className="mr-4">
                {icon ? (
                    <View className="w-14 h-14 rounded-2xl bg-secondary items-center justify-center">
                        <AntDesign name={icon} size={20} color={colors.text} />
                    </View>
                ) : (
                    <View className="w-12 h-12 rounded-full bg-secondary items-center justify-center">
                        <Icon name="CreditCard" size={20} />
                    </View>
                )}
            </View>

            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <ThemedText className="text-lg font-semibold">{title}</ThemedText>
                    <ThemedText className="text-lg font-bold">{amount}</ThemedText>
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <ThemedText className="text-sm opacity-60 mr-2">{frequency}</ThemedText>
                        <View className="w-1 h-1 bg-text opacity-60 rounded-full mr-2" />
                        <ThemedText className="text-sm opacity-60">•••• {cardLast4}</ThemedText>
                    </View>

                    <View className="flex-row items-center">
                        <View className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <ThemedText className="text-sm opacity-60">
                            {isActive ? `Next: ${nextPayment}` : 'Paused'}
                        </ThemedText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};



