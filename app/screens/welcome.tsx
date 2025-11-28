import { View, Text, FlatList, Dimensions, Image, Pressable, ImageBackground } from 'react-native';
import { useState } from 'react';
import ThemedText from '@/components/ThemedText';
import ThemeToggle from '@/components/ThemeToggle';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import Icon from '@/components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { IconName } from '@/components/Icon';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

interface SlideData {
    id: string;
    title: string;
    description: string;
    icon: string;
}

const slides: SlideData[] = [
    {
        id: '1',
        title: 'Send Money Instantly',
        description: 'Transfer money to friends and family in seconds with just a few taps',
        icon: 'Send'
    },
    {
        id: '2',
        title: 'Secure Payments',
        description: 'Your transactions are protected with bank-level security and encryption',
        icon: 'Shield'
    },
    {
        id: '3',
        title: 'Track Your Spending',
        description: 'Monitor your expenses and manage your budget with detailed insights',
        icon: 'PieChart'
    },
    {
        id: '4',
        title: 'Digital Cards',
        description: 'Create virtual cards for online shopping and manage all your cards in one place',
        icon: 'CreditCard'
    },
];

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { signOut } = useAuth();
    const insets = useSafeAreaInsets();

    const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    return (
        <View className='flex-1 bg-background'>
            <ImageBackground
                source={require('@/assets/img/wallpaper.webp')}
                className='w-full h-full absolute top-0 left-0'
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{ width: '100%', height: '100%' }}
                >
                    <View className="flex-1 relative">

                        {/* Slideable Content */}
                        <View className="flex-1 justify-center">
                            <FlatList
                                data={slides}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={handleScroll}
                                snapToAlignment="center"
                                decelerationRate="fast"
                                snapToInterval={width}
                                renderItem={({ item }) => (
                                    <View style={{ width }} className="items-center justify-center px-8">
                                        <View className="items-center">
                                            <View className="w-20 h-20 bg-highlight rounded-2xl items-center justify-center mb-8">
                                                <Icon name={item.icon as IconName} size={32} strokeWidth={1.5} color="black" />
                                            </View>
                                            <ThemedText className="text-3xl font-outfit-bold text-white text-center mb-2">
                                                {item.title}
                                            </ThemedText>
                                            <Text className="text-center text-white opacity-80 text-lg px-4 leading-6">
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View>

                        {/* Page Indicators */}
                        <View className="flex-row justify-center mb-20 w-full absolute" style={{ top: insets.top + 10 }}>
                            {slides.map((_, index) => (
                                <View
                                    key={index}
                                    className={`h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-white w-2' : 'bg-white/50 w-2'}`}
                                />
                            ))}
                        </View>

                        {/* Login/Signup Buttons */}
                        <View style={{ bottom: insets.bottom }} className="px-6 mb-6">
                            <View className='flex flex-row items-center justify-center gap-2'>
                                <Pressable
                                    onPress={() => router.push('/screens/notification-permission')}
                                    className='flex-1 border border-white rounded-full flex flex-row items-center justify-center py-4'
                                >
                                    <AntDesign name="google" size={22} color="white" />
                                </Pressable>
                                <Pressable
                                    onPress={() => router.push('/screens/login')}
                                    className='flex-1 bg-highlight rounded-full flex flex-row items-center justify-center py-4'
                                >
                                    <Icon name="Mail" size={20} color="black" />
                                </Pressable>
                                <Pressable
                                    onPress={() => router.push('/screens/notification-permission')}
                                    className='flex-1 border border-white rounded-full flex flex-row items-center justify-center py-4'
                                >
                                    <AntDesign name="apple" size={22} color="white" />
                                </Pressable>
                            </View>
                            <Pressable
                                onPress={async () => {
                                    await signOut();
                                    router.push('/sign-in');
                                }}
                                className='w-full bg-white rounded-full flex flex-row items-center justify-center py-4 mt-4'
                            >
                                <Icon name="Phone" size={20} color="black" />
                                <Text className="text-black font-outfit-bold text-lg ml-2">Login with your phone</Text>
                            </Pressable>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}
