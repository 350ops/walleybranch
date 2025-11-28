import { View, TouchableOpacity } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { useThemeColors } from "@/app/contexts/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import { Chip } from '@/components/Chip';
import Icon from '@/components/Icon';

type FilterType = 'all' | 'active' | 'cancelled';

interface DirectDebit {
    id: string;
    companyName: string;
    amount: string;
    frequency: string;
    nextPayment: string;
    accountLast4: string;
    isActive: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
    category: string;
    mandateDate: string;
}

const directDebitsData: DirectDebit[] = [
    // Utilities
    {
        id: '1',
        companyName: 'Electric Power Company',
        amount: '$125.50',
        frequency: 'Monthly',
        nextPayment: 'Feb 5, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'bulb',
        category: 'Utilities',
        mandateDate: 'Jan 15, 2024'
    },
    {
        id: '2',
        companyName: 'Water & Sewer Authority',
        amount: '$68.25',
        frequency: 'Monthly',
        nextPayment: 'Feb 8, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'dropbox',
        category: 'Utilities',
        mandateDate: 'Jan 15, 2024'
    },
    {
        id: '3',
        companyName: 'Gas Company',
        amount: '$89.75',
        frequency: 'Monthly',
        nextPayment: 'Feb 12, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'setting',
        category: 'Utilities',
        mandateDate: 'Jan 15, 2024'
    },
    {
        id: '4',
        companyName: 'Internet Provider',
        amount: '$79.99',
        frequency: 'Monthly',
        nextPayment: 'Feb 15, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'wifi',
        category: 'Utilities',
        mandateDate: 'Feb 1, 2024'
    },
    
    // Insurance
    {
        id: '5',
        companyName: 'Auto Insurance Co.',
        amount: '$156.00',
        frequency: 'Monthly',
        nextPayment: 'Feb 3, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'car',
        category: 'Insurance',
        mandateDate: 'Mar 10, 2024'
    },
    {
        id: '6',
        companyName: 'Health Insurance',
        amount: '$245.80',
        frequency: 'Monthly',
        nextPayment: 'Feb 1, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'heart',
        category: 'Insurance',
        mandateDate: 'Jan 1, 2024'
    },
    
    // Loans & Finance
    {
        id: '7',
        companyName: 'Mortgage Bank',
        amount: '$1,850.00',
        frequency: 'Monthly',
        nextPayment: 'Feb 1, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'home',
        category: 'Loans',
        mandateDate: 'Jun 15, 2023'
    },
    {
        id: '8',
        companyName: 'Student Loan Services',
        amount: '$285.50',
        frequency: 'Monthly',
        nextPayment: 'Feb 10, 2025',
        accountLast4: '7890',
        isActive: true,
        icon: 'book',
        category: 'Loans',
        mandateDate: 'Sep 1, 2023'
    },
    
    // Cancelled
    {
        id: '9',
        companyName: 'Old Gym Membership',
        amount: '$45.00',
        frequency: 'Monthly',
        nextPayment: 'Cancelled',
        accountLast4: '7890',
        isActive: false,
        icon: 'heart',
        category: 'Health',
        mandateDate: 'May 20, 2024'
    },
    {
        id: '10',
        companyName: 'Previous Phone Plan',
        amount: '$65.00',
        frequency: 'Monthly',
        nextPayment: 'Cancelled',
        accountLast4: '7890',
        isActive: false,
        icon: 'phone',
        category: 'Utilities',
        mandateDate: 'Aug 10, 2024'
    }
];

export default function DirectDebitsScreen() {
    const colors = useThemeColors();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

    // Filter direct debits based on selected filter
    const filteredDebits = directDebitsData.filter(debit => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'active') return debit.isActive;
        if (selectedFilter === 'cancelled') return !debit.isActive;
        return true;
    });

    // Group debits by category
    const groupedDebits = filteredDebits.reduce((groups, debit) => {
        const category = debit.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(debit);
        return groups;
    }, {} as Record<string, DirectDebit[]>);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className='pt-4 p-global'>
                <Section title="Direct Debits" titleSize='4xl' className='mt-8 mb-4' />
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
                        label="Cancelled"
                        size='lg'
                        isSelected={selectedFilter === 'cancelled'}
                        onPress={() => setSelectedFilter('cancelled')}
                    />
                </View>

                {Object.entries(groupedDebits).map(([category, debits]) => (
                    <View key={category} className="mb-6">
                        <ThemedText className="text-lg font-semibold mb-3 text-text opacity-80">
                            {category}
                        </ThemedText>
                        {debits.map((debit) => (
                            <DirectDebitItem
                                key={debit.id}
                                companyName={debit.companyName}
                                amount={debit.amount}
                                frequency={debit.frequency}
                                nextPayment={debit.nextPayment}
                                accountLast4={debit.accountLast4}
                                isActive={debit.isActive}
                                icon={debit.icon}
                                mandateDate={debit.mandateDate}
                            />
                        ))}
                    </View>
                ))}
            </ThemedScroller>
        </>
    );
}

interface DirectDebitItemProps {
    companyName: string;
    amount: string;
    frequency: string;
    nextPayment: string;
    accountLast4: string;
    isActive: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
    mandateDate: string;
}

const DirectDebitItem: React.FC<DirectDebitItemProps> = ({
    companyName,
    amount,
    frequency,
    nextPayment,
    accountLast4,
    isActive,
    icon,
    mandateDate
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
                    <View className="w-14 h-14 rounded-2xl bg-secondary items-center justify-center">
                        <Icon name="Building" size={20} />
                    </View>
                )}
            </View>
            
            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <ThemedText className="text-lg font-semibold">{companyName}</ThemedText>
                    <ThemedText className="text-lg font-bold">{amount}</ThemedText>
                </View>
                
                <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                        <View className="flex-row items-center mb-1">
                            <ThemedText className="text-sm opacity-60 mr-2">{frequency}</ThemedText>
                            <View className="w-1 h-1 bg-text opacity-60 rounded-full mr-2" />
                            <ThemedText className="text-sm opacity-60">•••• {accountLast4}</ThemedText>
                        </View>
                      
                    </View>
                    
                    <View className="flex-row items-center">
                        
                        <ThemedText className="text-sm opacity-60">
                            {isActive ? `Next: ${nextPayment}` : 'Cancelled'}
                        </ThemedText>
                        <View className={`w-2 h-2 rounded-full ml-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};



