import { View, Pressable } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Avatar from '@/components/Avatar';
import ListLink from '@/components/ListLink';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Icon from '@/components/Icon';
import Section from '@/components/layout/Section';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import { ActionSheetRef } from 'react-native-actions-sheet';

export default function ProfileScreen() {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    return (
        <>
            <Header showBackButton rightComponents={[<ThemeToggle />]} />
            <View className='flex-1'>
                <ThemedScroller className='flex-1 pt-4'>
                    <View className=" pt-10 pb-10 mb-4 w-full items-center">
                        <Avatar src={require('@/assets/img/user-3.jpg')} size="xxl" />
                        <View className=" items-center mt-4">
                            <ThemedText className="text-4xl font-bold">John Doe</ThemedText>
                            <ThemedText className='text-base mt-1'>Personal account</ThemedText>
                        </View>

                    </View>
                    <SwitchAccount onPress={() => actionSheetRef.current?.show()} />
                    <Section title="Your account" titleSize="2xl" className="mt-10 mb-4" />

                    <ListLink title="Inbox" icon="Mail" href="/screens/notifications" />
                    <ListLink title="Help" icon="HelpCircle" href="/screens/help" />
                    <ListLink title="Statements and reports" icon="File" href="/screens/statements" />
                    <Section title="Settings" titleSize="2xl" className="mt-10 mb-4" />
                    <ListLink title="Profile" description='Manage your profile' icon="Settings" href="/screens/edit-profile" />
                    <ListLink title="Notifications" description='Customize how you get updates' icon="Bell" href="/screens/notification-settings" />
                    <ListLink title="Limits" description='Set your spending limits' icon="GaugeCircle" href="/screens/limits" />
                    <ListLink title="Security" description='Manage your security settings' icon="Shield" href="/screens/security" />
                    <ListLink title="Language" description='Change your language' icon="Globe" href="/screens/languages" />
                    <ListLink title="Logout" description='Logout of your account' icon="LogOut" href="/screens/welcome" />
                </ThemedScroller>
            </View>

            <SwitchAccountDrawer ref={actionSheetRef} />
        </>
    );
}

const SwitchAccount = (props: { onPress: () => void }) => {
    return (
        <Pressable className='flex-row items-center  bg-secondary rounded-2xl p-6' onPress={props.onPress}>
            <View className='flex-row items-center mr-5'>
                <Avatar name='John Doe' size='sm' className='border border-border mb-4' />
                <Avatar name='Ted Lasso' size='sm' className='border border-border mt-4 -ml-4' />
            </View>
            <ThemedText className='text-lg font-semibold'>Switch Account</ThemedText>

            <Icon name='ChevronRight' size={20} className='ml-auto' />
        </Pressable>
    );
}

const SwitchAccountDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global'>
                <ThemedText className='text-2xl font-bold mb-4'>Switch Account</ThemedText>
                <ProfileItem isSelected src={require('@/assets/img/user-3.jpg')} name='John Doe' label='Personal account' />
                <ProfileItem name='Tad Lasso' label='Business account' />
                <ProfileItem name='JD Studios' label='Business account' />
            </View>
        </ActionSheetThemed>
    );
});

const ProfileItem = (props: any) => {
    return (
        <Pressable className='flex-row items-center  bg-secondary rounded-2xl py-4'>
            <View className='relative mr-4'>
                <Avatar src={props.src} size="lg" name={props.name} className='border border-border' />
                {props.isSelected && <Icon name='Check' color='white' size={14} strokeWidth={2} className='absolute bottom-0 right-0 w-7 h-7 bg-highlight rounded-full border-2 border-secondary' />}
            </View>
            <View className='flex-1'>
                <ThemedText className='font-semibold text-xl'>{props.name}</ThemedText>
                <ThemedText className='text-sm'>{props.label}</ThemedText>
            </View>
            <Icon name='ChevronRight' size={20} className='opacity-40' />
        </Pressable>
    );
}

