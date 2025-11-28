import { View } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Avatar from '@/components/Avatar';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef } from 'react';
import Section from '@/components/layout/Section';
import { ActionButton } from '@/components/ActionButton';
import { router } from 'expo-router';

export default function UserScreen() {
    return (
        <>
            <Header showBackButton rightComponents={[<HeaderIcon icon="Trash" href="" />]} />
            <ThemedScroller className=' pt-4'>
                <View className=" pt-10 pb-10 mb-4 w-full items-center">
                    <Avatar src={require('@/assets/img/user-1.jpg')} size="xxl" />
                    <View className=" items-center mt-4">
                        <ThemedText className="text-4xl font-bold">Jessica Alma</ThemedText>
                        <ThemedText className='text-base mt-1'>US Account ending 2323</ThemedText>
                    </View>

                    <View className='flex flex-row items-center mt-8 gap-8'>
                        <ActionButton icon="ArrowUp" label='Send' onPress={() => router.push('/screens/send')} />
                        <ActionButton icon="ArrowDown" label='Request' />
                    </View>

                </View>
                <Section title="Account details" titleSize="2xl" className=" mb-4">
                    <View className='p-4 bg-secondary rounded-2xl'>
                        <DetailItem label="Account number" value="1234 5678 9012 3456" />
                        <DetailItem label="Account holder name" value="Jessica Alma" />
                        <DetailItem label="Bank name" value="Bank of America" />
                        <DetailItem label="Account type" value="Checking" />
                        <DetailItem label="Address" value="21 New " />
                        <DetailItem label="City" value="Anytown" />
                        <DetailItem label="State" value="CA" />
                        <DetailItem label="Zip code" value="12345" />
                        <DetailItem label="Country" value="USA" />
                        <DetailItem label="Phone number" value="+1 (123) 456-7890" />
                        <DetailItem label="Email" value="jessica@example.com" />
                    </View>

                </Section>

            </ThemedScroller>

        </>
    );
}


const DetailItem = (props: any) => {
    return (
        <View className='flex-row items-center justify-between my-3'>
            <View>
                <ThemedText className='text-sm'>{props.label}</ThemedText>
                <ThemedText className='text-lg'>{props.value}</ThemedText>
            </View>
        </View>
    )
}



