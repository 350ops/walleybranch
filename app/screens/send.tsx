import { View, Image, ScrollView, Pressable, TextInput, Text } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Avatar from '@/components/Avatar';
import ListLink from '@/components/ListLink';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Icon from '@/components/Icon';
import Section from '@/components/layout/Section';
import useThemeColors from "@/contexts/ThemeColors";
import MultiStep, { Step } from '@/components/MultiStep';
import { router } from 'expo-router';
import Select from '@/components/forms/Select';

const options = [
    { label: 'General monthly living expense', value: 'general' },
    { label: 'Pay for good and services', value: 'rent' },
    { label: 'Investments', value: 'food' },
    { label: 'Transportation', value: 'transportation' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Sending money to friends', value: 'other' }
];


export default function SendScreen() {
    return (
        <>
            <MultiStep
                onComplete={() => {
                    router.push({
                        pathname: '/(drawer)/(tabs)/',
                        params: {}
                    });
                }}
                onClose={() => router.push('/(drawer)/(tabs)/')}
            >
                <Step title="Amount">
                    <Amount />
                </Step>

                <Step title="Reason">
                    <Reason />
                </Step>
                <Step title="Review">
                    <Review />
                </Step>
                <Step title="Success">
                    <Success />
                </Step>

            </MultiStep>

        </>
    );
}


const Amount = () => {
    return (
        <View className='w-full px-global'>
            <Section title="Recipient" titleSize='lg'>
                <View className='flex-row items-center p-4 bg-secondary rounded-2xl'>
                    <Avatar src={require('@/assets/img/user-1.jpg')} size="md" />
                    <View className='ml-4'>
                        <ThemedText className='text-lg font-semibold'>Jessica Alma</ThemedText>
                        <ThemedText className='text-xs'>Account ending 2323</ThemedText>
                    </View>
                </View>
            </Section>
            <Section title="Amount" titleSize='lg' className='mt-10'>
                <View className='bg-secondary rounded-2xl flex-row w-full items-center'>
                    <ThemedText className='text-xl pl-6 font-semibold'>USD</ThemedText>
                    <TextInput placeholderTextColor="gray" placeholder='0.00' className='h-20 text-text flex-1 text-4xl px-6 text-right font-bold' />
                </View>
                <Text className="text-sm text-highlight mt-2">Available balance $11,824.00 USD</Text>
            </Section>
        </View>
    )
}

const Reason = () => {
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const validateCategory = (value: string | number) => {
        setCategory(String(value));
        if (!value) {
            setCategoryError('Please select a category');
        } else {
            setCategoryError('');
        }
    };
    return (
        <Section title="What's the reason for your transfer?" titleSize='4xl' subtitle='To help us kee your account safe and secure, please let us know why you are making this transfer' className='mt-10 px-global'>
            <Select className='mt-10' value={category} onChange={validateCategory} placeholder='Please select' options={options} />
        </Section>
    )
}

const Review = () => {
    return (
        <ThemedScroller>
            <View className='items-center'>
                <View className='w-20 h-20 border border-border rounded-full items-center justify-center'>
                    <Icon name="ArrowDown" />
                </View>
                <ThemedText className='text-3xl font-bold mt-6'>$3,000.00</ThemedText>
                <ThemedText className='text-sm text-highlight mt-2'>Jessica Alma</ThemedText>
                <Section title="Transaction details" titleSize='2xl' className='mt-14'>
                    <DetailItem label="Amount" value="$3,000.00" />
                    <DetailItem label="Reason" value="General monthly living expense" />
                    <DetailItem label="Recipient" value="Jessica Alma" />
                    <DetailItem label="Account ending" value="2323" />
                    <DetailItem label="Date" value="2025-08-08" />
                    <DetailItem label="Time" value="10:00 AM" />
                    <DetailItem label="Transaction ID" value="1234567890" />
                    <DetailItem label="Status" value="Pending" />
                </Section>
            </View>
        </ThemedScroller>
    )
}

const Success = () => {

    return (
        <ThemedScroller>
            <View className='items-center pt-20'>
                <View className='w-20 h-20 bg-highlight rounded-full items-center justify-center'>
                    <Icon name="Check" color='black' />
                </View>
                <ThemedText className='text-3xl font-bold mt-6'>All done!</ThemedText>
                <Section title="Track your transfer" titleSize='2xl' className='mt-20'>
                    <View className='mt-6'>
                        <TransferDetail label="Tuesday, 5 August at 09:00" value="You set u your transfer" />
                        <View className='h-10 w-px bg-text ml-3 opacity-50' />
                        <TransferDetail label="Tuesday, 5 August at 09:00" value="You used USD in your account" />
                        <View className='h-10 w-px bg-text ml-3 opacity-50' />
                        <TransferDetail label="Tuesday, 5 August at 09:10" value="We paid out your USD" />
                        <View className='h-10 w-px bg-text ml-3 opacity-50' />
                        <TransferDetail label="Tuesday, 5 August at 09:10" value="Your transfer is complete!" />
                    </View>
                </Section>
            </View>
        </ThemedScroller>
    )
}

const TransferDetail = (props: any) => {
    const colors = useThemeColors();
    return (
        <View className='flex-row items-center justify-between '>
            <Icon name="Check" color={colors.highlight} />
            <View className='w-full pl-5'>
                <ThemedText className='text-base'>{props.label}</ThemedText>
                <ThemedText className='text-lg font-semibold'>{props.value}</ThemedText>
            </View>
        </View>
    )
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



