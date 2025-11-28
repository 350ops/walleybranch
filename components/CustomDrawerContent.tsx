import { Link, router } from 'expo-router';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import ThemedText from './ThemedText';
import Icon, { IconName } from './Icon';
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';
import ThemedScroller from './ThemeScroller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomDrawerContent() {
    const insets = useSafeAreaInsets();
    return (
        <ThemedScroller className="flex-1 p-8 bg-secondary " style={{ paddingTop: insets.top }}>

            <ThemedText className='text-2xl font-outfit-bold mb-8 mt-4'>Walley<Text className="text-highlight">.</Text></ThemedText>
            
            {/* User Profile Section */}
            <Pressable onPress={() => router.push('/(drawer)/(tabs)/profile')} className="flex-row items-center mb-8 py-10 border-b border-border   rounded-xl">
                <Avatar src={require('@/assets/img/user-3.jpg')} size="md" />
                <View className="ml-3">
                    <ThemedText className="font-semibold text-light-text dark:text-dark-text">John Doe</ThemedText>
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">john@doe.com</ThemedText>
                </View>
            </Pressable>

            <View className='flex-col pb-6 mb-6 border-b border-border'>
                <NavItem href="/(drawer)/(tabs)/index" icon="Home" label="Home" />
                <NavItem href="/(drawer)/(tabs)/cards" icon="CreditCard" label="Cards" />
                <NavItem href="/(drawer)/(tabs)/recipients" icon="UsersRound" label="Recipients"  />
                <NavItem href="/(drawer)/(tabs)/payments" icon="ArrowUpDown" label="Payments" />
                <NavItem href="/screens/profile" icon="User" label="Profile"  />
            </View>
            
            <View className='flex-row justify-between items-center'>    
                <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext'>Version 1.0.0</ThemedText>
            </View>

        </ThemedScroller>
    );
}

type NavItemProps = {
    href: string;
    icon: IconName;
    label: string;
    className?: string;
    description?: string;
};

export const NavItem = ({ href, icon, label, description }: NavItemProps) => (
    <TouchableOpacity onPress={() => router.push(href)} className={`flex-row items-center py-3`}>
        <View className='flex-row items-center justify-center w-14 h-14 bg-background   rounded-xl'>
            <Icon name={icon} size={18} className='' />
        </View>
        <View className='flex-1 ml-4 '>
            {label &&
                <ThemedText className="text-lg font-bold ">{label}</ThemedText>
            }
            {description &&
                <ThemedText className='opacity-50 text-xs'>{description}</ThemedText>
            }
        </View>
    </TouchableOpacity>
);


