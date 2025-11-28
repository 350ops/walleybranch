import { View, TouchableOpacity, Image } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { AntDesign } from "@expo/vector-icons";
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import { Chip } from '@/components/Chip';
import Avatar from '@/components/Avatar';

type FilterType = 'all' | 'pending' | 'completed';

interface PaymentRequest {
    id: string;
    fromName: string;
    amount: string;
    description: string;
    requestDate: string;
    status: 'pending' | 'completed' | 'expired';
    avatar?: any;
    dueDate?: string;
}

const paymentRequestsData: PaymentRequest[] = [
    // Pending Requests
    {
        id: '1',
        fromName: 'Sarah Miller',
        amount: '$45.00',
        description: 'Dinner at Italian restaurant',
        requestDate: 'Jan 28, 2025',
        status: 'pending',
        avatar: require('@/assets/img/user-1.jpg'),
        dueDate: 'Feb 5, 2025'
    },
    {
        id: '2',
        fromName: 'Michael Chen',
        amount: '$120.00',
        description: 'Concert tickets split',
        requestDate: 'Jan 27, 2025',
        status: 'pending',
        avatar: require('@/assets/img/user-2.jpg'),
        dueDate: 'Feb 3, 2025'
    },
    {
        id: '3',
        fromName: 'Emma Wilson',
        amount: '$30.00',
        description: 'Uber ride home',
        requestDate: 'Jan 26, 2025',
        status: 'pending',
        avatar: require('@/assets/img/user-3.jpg'),
        dueDate: 'Feb 2, 2025'
    },
    {
        id: '4',
        fromName: 'David Rodriguez',
        amount: '$85.50',
        description: 'Grocery shopping split',
        requestDate: 'Jan 25, 2025',
        status: 'pending',
        avatar: require('@/assets/img/user-4.jpg'),
        dueDate: 'Feb 1, 2025'
    },

    // Completed Requests
    {
        id: '5',
        fromName: 'Lisa Thompson',
        amount: '$25.00',
        description: 'Movie tickets',
        requestDate: 'Jan 22, 2025',
        status: 'completed'
    },
    {
        id: '6',
        fromName: 'James Park',
        amount: '$60.00',
        description: 'Weekend trip gas money',
        requestDate: 'Jan 20, 2025',
        status: 'completed'
    },
    {
        id: '7',
        fromName: 'Anna Davis',
        amount: '$15.75',
        description: 'Coffee and breakfast',
        requestDate: 'Jan 18, 2025',
        status: 'completed'
    },

    // Expired Requests
    {
        id: '8',
        fromName: 'Tom Wilson',
        amount: '$75.00',
        description: 'Birthday party expenses',
        requestDate: 'Jan 10, 2025',
        status: 'expired'
    }
];

export default function PaymentRequestsScreen() {
    const colors = useThemeColors();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

    // Filter payment requests based on selected filter
    const filteredRequests = paymentRequestsData.filter(request => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'pending') return request.status === 'pending';
        if (selectedFilter === 'completed') return request.status === 'completed';
        return true;
    });

    // Group requests by status
    const groupedRequests = filteredRequests.reduce((groups, request) => {
        const status = request.status === 'pending' ? 'Pending Requests' :
            request.status === 'completed' ? 'Completed' : 'Expired';
        if (!groups[status]) {
            groups[status] = [];
        }
        groups[status].push(request);
        return groups;
    }, {} as Record<string, PaymentRequest[]>);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className='pt-4 p-global'>
                <Section title="Payment Requests" titleSize='4xl' className='mt-8 mb-4' />
                <View className="flex-row gap-1 mb-10">
                    <Chip
                        label="All"
                        size='lg'
                        isSelected={selectedFilter === 'all'}
                        onPress={() => setSelectedFilter('all')}
                    />
                    <Chip
                        label="Pending"
                        size='lg'
                        isSelected={selectedFilter === 'pending'}
                        onPress={() => setSelectedFilter('pending')}
                    />
                    <Chip
                        label="Completed"
                        size='lg'
                        isSelected={selectedFilter === 'completed'}
                        onPress={() => setSelectedFilter('completed')}
                    />
                </View>

                {Object.entries(groupedRequests).map(([status, requests]) => (
                    <View key={status} className="mb-6">
                        <ThemedText className="text-lg font-semibold mb-3 text-text opacity-80">
                            {status}
                        </ThemedText>
                        {requests.map((request) => (
                            <PaymentRequestItem
                                key={request.id}
                                fromName={request.fromName}
                                amount={request.amount}
                                description={request.description}
                                requestDate={request.requestDate}
                                status={request.status}
                                avatar={request.avatar}
                                dueDate={request.dueDate}
                            />
                        ))}
                    </View>
                ))}
            </ThemedScroller>
        </>
    );
}

interface PaymentRequestItemProps {
    fromName: string;
    amount: string;
    description: string;
    requestDate: string;
    status: 'pending' | 'completed' | 'expired';
    avatar?: any;
    dueDate?: string;
}

const PaymentRequestItem: React.FC<PaymentRequestItemProps> = ({
    fromName,
    amount,
    description,
    requestDate,
    status,
    avatar,
    dueDate
}) => {
    const colors = useThemeColors();

    const getStatusColor = () => {
        switch (status) {
            case 'pending': return 'bg-orange-500';
            case 'completed': return 'bg-green-500';
            case 'expired': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'pending': return dueDate ? `${dueDate}` : 'Pending';
            case 'completed': return 'Paid';
            case 'expired': return 'Expired';
            default: return status;
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.9} className="flex-row items-center py-6 border-b border-border">
            <View className="mr-4">
                <Avatar src={avatar} size='md' name={fromName} />
            </View>

            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <ThemedText className="text-lg font-semibold">{fromName}</ThemedText>
                    <ThemedText className="text-lg font-bold">{amount}</ThemedText>
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                        <ThemedText className="text-sm opacity-60" numberOfLines={1}>
                            {description}
                        </ThemedText>

                    </View>

                    <View className="flex-row items-center">

                        <ThemedText className="text-sm opacity-60">
                            {getStatusText()}
                        </ThemedText>
                        <View className={`w-2 h-2 rounded-full ml-2 ${getStatusColor()}`} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};



