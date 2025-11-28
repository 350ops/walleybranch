import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import ThemedScroller from 'components/ThemeScroller';
import Header, { HeaderIcon } from 'components/Header';
import Avatar from '@/components/Avatar';
import ThemedText from '@/components/ThemedText';
import { CardScroller } from '@/components/CardScroller';
import { CardPreview } from '@/components/CardPreview';
import { TransactionItem } from '@/components/TransactionItem';
import Section from '@/components/layout/Section';
import { BalanceChart } from '@/components/BalanceChart';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedView from '@/components/AnimatedView';

const { width } = Dimensions.get('window');

export default function HomeScreen() {

  const animatedWidth = useSharedValue(0);

  useFocusEffect(
    React.useCallback(() => {
      animatedWidth.value = 0;
      animatedWidth.value = withTiming(width, { duration: 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1.0) });
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));
  return (
    <>
      <Header
        className='bg-background'
        leftComponent={<Avatar src={require('@/assets/img/user-3.jpg')} size="sm" link="/screens/profile" />}
        rightComponents={[<HeaderIcon icon="Bell" hasBadge href="/screens/notifications" />]}
      />
      <AnimatedView 
        animation="scaleIn" 
        className='flex-1 bg-background' 
        duration={300} 
      >
        <ThemedScroller className="flex-1 bg-background !px-0">
          <View className='p-global mt-global'>
            <ThemedText className="text-sm mb-1">Total balance</ThemedText>
            <View className='flex-row items-center'>
              <ThemedText className="text-4xl font-bold">11,201.6 USD</ThemedText>
              <Text className='text-white text-sm font-semibold px-2 py-1 rounded-full bg-lime-500 ml-4'>+10.2%</Text>
            </View>
          </View>
          <Animated.View style={animatedStyle} className='overflow-hidden'>
            <BalanceChart />
          </Animated.View>


          <Section title='Cards' className='px-global mt-4'>
            <CardScroller space={10}>
              <CardPreview cardNumber="1234" expiryDate="01/2028" brand="Visa" onSetDefault={() => { }} onDelete={() => { }} />
              <CardPreview cardNumber="1234" expiryDate="08/2026" brand="Mastercard" onSetDefault={() => { }} onDelete={() => { }} />
            </CardScroller>
          </Section>

          <Section title='Transactions' link="/screens/transactions" linkText='See all' titleSize='2xl' className='px-global mt-10 '>
            <TransactionItem isIncome icon="apple" title="Apple" amount="$359.00" method="Apple Pay" time="1 hour ago" />
            <TransactionItem icon="google" title="Google" amount="$51.00" method="Google Pay" time="2 hours ago" />
            <TransactionItem avatar={require('@/assets/img/user-3.jpg')} title="John Doe" amount="$119.00" method="Amazon Pay" time="3 hours ago" />
            <TransactionItem icon="amazon" title="Amazon" amount="$119.00" method="Amazon Pay" time="3 hours ago" />
          </Section>

        </ThemedScroller>
      </AnimatedView>
    </>
  );
}

