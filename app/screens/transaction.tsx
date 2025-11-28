import { View } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { useThemeColors } from "@/app/contexts/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Section from '@/components/layout/Section';

export default function TransactionScreen() {
    const colors = useThemeColors();
    return (
        <>
            <Header showBackButton  />
            <ThemedScroller className=' pt-4'>
                <View className='items-center'>
                    <View className='w-24 h-24 bg-secondary rounded-full items-center justify-center'>
                        <AntDesign name="apple" size={30} color={colors.text} />
                    </View>
                    <ThemedText className='text-3xl font-bold mt-6'>$199.00</ThemedText>
                    <ThemedText className='text-sm text-highlight mt-2'>Apple</ThemedText>
                    <Section title="Transaction details" titleSize='2xl' className='mt-14'>
                        <DetailItem label="Amount" value="$199.00" />
                        <DetailItem label="Reason" value="Subscription" />
                        <DetailItem label="Recipient" value="Apple" />
                        <DetailItem label="Account ending" value="2323" />
                        <DetailItem label="Date" value="2025-08-08" />
                        <DetailItem label="Time" value="10:00 AM" />
                        <DetailItem label="Transaction ID" value="1234567890" />
                        <DetailItem label="Status" value="Pending" />
                    </Section>
                </View>
            </ThemedScroller>


        </>
    );
}


const DetailItem = (props: any) => {
    return (
        <View className='flex-row items-center justify-between border-b border-border py-4'>
            <View className='w-full flex flex-row justify-between'>
                <ThemedText className='text-base'>{props.label}</ThemedText>
                <ThemedText className='text-lg font-semibold'>{props.value}</ThemedText>
            </View>
        </View>
    )
}

