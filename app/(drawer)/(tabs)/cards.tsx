import React, { useMemo, useRef } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ActionSheetRef } from 'react-native-actions-sheet';

import { ActionButton } from '@/components/ActionButton';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import AnimatedView from '@/components/AnimatedView';
import { Button } from '@/components/Button';
import Header, { HeaderIcon } from '@/components/Header';
import Icon from '@/components/Icon';
import ListLink from '@/components/ListLink';
import Section from '@/components/layout/Section';
import { SnappyCardScroller } from '@/components/SnappyCardScroller';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import useCards from '@/hooks/useCards';

export default function CardsScreen() {
  const pinDrawerRef = useRef<ActionSheetRef>(null);
  const detailsDrawerRef = useRef<ActionSheetRef>(null);
  const freezeDrawerRef = useRef<ActionSheetRef>(null);
  const unblockPinDrawerRef = useRef<ActionSheetRef>(null);
  const { cards, isLoading } = useCards();

  const cardData = useMemo(
    () =>
      cards.map((card) => ({
        id: card.id,
        expiryDate: `${card.expiry_month.toString().padStart(2, '0')}/${card.expiry_year}`,
        brand: card.card_brand ?? 'Visa',
        cardNumber: card.card_number_last4,
      })),
    [cards]
  );

  return (
    <>
      <Header
        className="pt-10"
        rightComponents={[<HeaderIcon icon="Plus" href="/screens/add-card" />]}
      />
      <AnimatedView animation="scaleIn" className="flex-1 bg-background" duration={300}>
        <ThemedScroller className="!px-0">
          <Section title="Cards" titleSize="4xl" className="mt-4 px-global" />
          <View className="mt-4">
            {isLoading ? (
              <ThemedText className="py-10 text-center opacity-60">Loading cards...</ThemedText>
            ) : (
              <SnappyCardScroller cards={cardData} addCard={<AddCard />} />
            )}
            {cardData.length > 0 && (
              <View className="mt-10 flex-row items-center justify-center gap-10">
                <ActionButton
                  icon="KeyRound"
                  label="Show PIN"
                  onPress={() => pinDrawerRef.current?.show()}
                />
                <ActionButton
                  icon="CreditCard"
                  label="Card details"
                  onPress={() => detailsDrawerRef.current?.show()}
                />
                <ActionButton
                  icon="Snowflake"
                  label="Freeze card"
                  onPress={() => freezeDrawerRef.current?.show()}
                />
              </View>
            )}
          </View>
          <Section title="Manage card" titleSize="xl" className="mt-16 px-global">
            <ListLink
              title="Card controls"
              icon="Settings"
              href="/screens/card-controls"
              showChevron
            />
            <ListLink
              title="Unblock PIN"
              icon="LockOpen"
              onPress={() => unblockPinDrawerRef.current?.show()}
              showChevron
            />
            <ListLink title="Limits" icon="GaugeCircle" href="/screens/limits" showChevron />
          </Section>
        </ThemedScroller>
      </AnimatedView>
      <PinDrawer ref={pinDrawerRef} />
      <DetailsDrawer ref={detailsDrawerRef} />
      <FreezeDrawer ref={freezeDrawerRef} />
      <UnblockPinDrawer ref={unblockPinDrawerRef} />
    </>
  );
}

const AddCard = () => {
  const { width } = Dimensions.get('window');
  return (
    <Link asChild href="/screens/add-card">
      <Pressable
        style={{ height: width * 0.4, width: width * 0.7 }}
        className="relative flex flex-col items-center justify-center rounded-3xl border border-border bg-secondary">
        <Icon name="Plus" size={24} />
        <View className="absolute left-0 top-0 flex h-full w-full flex-row flex-wrap">
          <View className="absolute left-0 top-0 h-20 w-20 rounded-tl-3xl border-l border-t border-highlight" />
          <View className="absolute right-0 top-0 h-20 w-20 rounded-tr-3xl border-r border-t border-highlight" />
          <View className="absolute bottom-0 left-0 h-20 w-20 rounded-bl-3xl border-b border-l border-highlight" />
          <View className="absolute bottom-0 right-0 h-20 w-20 rounded-br-3xl border-b border-r border-highlight" />
        </View>
      </Pressable>
    </Link>
  );
};

const PinDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheetThemed gestureEnabled ref={ref}>
      <View className="items-center p-global pt-10">
        <ThemedText className="text-4xl font-bold">1234</ThemedText>
        <ThemedText className="mb-4 text-center text-base">This is your pin</ThemedText>
      </View>
    </ActionSheetThemed>
  );
});

const DetailsDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheetThemed gestureEnabled ref={ref}>
      <View className="p-global pt-10 ">
        <CardDetailItem label="Cardholder name" value="John Doe" />
        <CardDetailItem label="Card number" value="1234 5678 9012 3456" />
        <CardDetailItem label="Expiry date" value="01/2028" />
        <CardDetailItem label="CCV" value="123" />
        <CardDetailItem label="Card type" value="Debit" />

        <CardDetailItem label="Billing Address" value="123 Main St, Anytown, USA" />
      </View>
    </ActionSheetThemed>
  );
});

const CardDetailItem = (props: any) => {
  return (
    <View className="my-3 flex-row items-center justify-between">
      <View>
        <ThemedText className="text-sm">{props.label}</ThemedText>
        <ThemedText className="text-lg">{props.value}</ThemedText>
      </View>
      <Pressable className="rounded-full bg-background px-3 py-2">
        <Text className="text-sm font-bold text-highlight">Copy</Text>
      </Pressable>
    </View>
  );
};

const FreezeDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheetThemed gestureEnabled ref={ref}>
      <View className="items-center p-global pt-10">
        <ThemedText className="text-3xl font-bold">Freeze card?</ThemedText>
        <ThemedText className="mb-4 text-center text-base">
          Are you sure you want to freeze your card?
        </ThemedText>
        <View className="mt-14 flex-row items-center justify-center gap-2">
          <Button title="Cancel" className="flex-1" variant="outline" />
          <Button title="Freeze" className="flex-1" />
        </View>
      </View>
    </ActionSheetThemed>
  );
});

const UnblockPinDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheetThemed gestureEnabled ref={ref}>
      <View className="items-start p-global pt-10">
        <ThemedText className="mb-2 text-3xl font-bold">Unblock PIN?</ThemedText>
        <ThemedText className="mb-4 text-base">
          If you enter the wrong PIN 3 times, your PIN gets blocked and your card won't work.
        </ThemedText>
        <View className="mt-6 flex-row items-center justify-center gap-2">
          <Pressable className="flex-1 items-center rounded-full bg-highlight px-3 py-4">
            <Text className="text-base font-bold">Unblock now</Text>
          </Pressable>
        </View>
      </View>
    </ActionSheetThemed>
  );
});
