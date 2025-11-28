import { View, Text, Dimensions, Pressable } from "react-native";
import ThemedScroller from "@/components/ThemeScroller";
import Header, { HeaderIcon } from "@/components/Header";
import Section from "@/components/layout/Section";
import Icon from "@/components/Icon";
import { SnappyCardScroller } from "@/components/SnappyCardScroller";
import ListLink from "@/components/ListLink";
import { ActionButton } from "@/components/ActionButton";
import ActionSheetThemed from "@/components/ActionSheetThemed";
import { ActionSheetRef } from "react-native-actions-sheet";
import ThemedText from "@/components/ThemedText";
import React, { useRef } from "react";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import AnimatedView from "@/components/AnimatedView";

export default function CardsScreen() {
    const pinDrawerRef = useRef<ActionSheetRef>(null);
    const detailsDrawerRef = useRef<ActionSheetRef>(null);
    const freezeDrawerRef = useRef<ActionSheetRef>(null);
    const unblockPinDrawerRef = useRef<ActionSheetRef>(null);
    const cardData = [
        {
            id: '1',
            expiryDate: '01/2028',
            brand: 'Visa',
            cardNumber: '8274',
        },
        {
            id: '2',
            expiryDate: '08/2026',
            brand: 'Mastercard',
            cardNumber: '1542',
        },
    ];

    return (
        <>
            <Header
                className='pt-10'
                rightComponents={[<HeaderIcon icon="Plus" href="/screens/add-card" />]}
            />
            <AnimatedView
                animation="scaleIn"
                className='flex-1 bg-background'
                duration={300}
            >
            <ThemedScroller className="!px-0">
                <Section title='Cards' titleSize="4xl" className='mt-4 px-global' />
                <View className="mt-4">
                    <SnappyCardScroller
                        cards={cardData}
                        addCard={<AddCard />}
                    />
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
                </View>
                <Section title="Manage card" titleSize="xl" className="px-global mt-16">
                    <ListLink title="Card controls" icon="Settings" href="/screens/card-controls" showChevron />
                    <ListLink title="Unblock PIN" icon="LockOpen" onPress={() => unblockPinDrawerRef.current?.show()} showChevron />
                    <ListLink title="Limits" icon="GaugeCircle" href="/screens/limits" showChevron />
                </Section>
            </ThemedScroller>
            </AnimatedView>
            <PinDrawer ref={pinDrawerRef} />
            <DetailsDrawer ref={detailsDrawerRef} />
            <FreezeDrawer ref={freezeDrawerRef} />
            <UnblockPinDrawer ref={unblockPinDrawerRef} />
        </>
    )
}


const AddCard = () => {
    const { width } = Dimensions.get('window');
    return (
        <Link asChild href="/screens/add-card">
            <Pressable
                style={{ height: width * 0.4, width: width * 0.7 }}
                className="rounded-3xl flex flex-col justify-center bg-secondary relative items-center border border-border">
                <Icon name="Plus" size={24} />
                <View className="w-full h-full absolute top-0 left-0 flex flex-wrap flex-row">
                    <View className="rounded-tl-3xl border-l border-t border-highlight w-20 h-20 absolute top-0 left-0" />
                    <View className="rounded-tr-3xl border-r border-t border-highlight w-20 h-20 absolute top-0 right-0" />
                    <View className="rounded-bl-3xl border-l border-b border-highlight w-20 h-20 absolute bottom-0 left-0" />
                    <View className="rounded-br-3xl border-r border-b border-highlight w-20 h-20 absolute bottom-0 right-0" />
                </View>
            </Pressable>
        </Link>
    )
}


const PinDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global pt-10 items-center'>
                <ThemedText className='text-4xl font-bold'>1234</ThemedText>
                <ThemedText className='text-base text-center mb-4'>This is your pin</ThemedText>
            </View>
        </ActionSheetThemed>
    );
});

const DetailsDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global pt-10 '>
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
        <View className='flex-row items-center justify-between my-3'>
            <View>
                <ThemedText className='text-sm'>{props.label}</ThemedText>
                <ThemedText className='text-lg'>{props.value}</ThemedText>
            </View>
            <Pressable className="px-3 py-2 rounded-full bg-background">
                <Text className='text-sm font-bold text-highlight'>Copy</Text>
            </Pressable>
        </View>
    )
}

const FreezeDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global pt-10 items-center'>
                <ThemedText className='text-3xl font-bold'>Freeze card?</ThemedText>
                <ThemedText className='text-base text-center mb-4'>Are you sure you want to freeze your card?</ThemedText>
                <View className="flex-row items-center justify-center gap-2 mt-14">
                    <Button title="Cancel" className="flex-1" variant="outline" />
                    <Button title="Freeze" className="flex-1" />
                </View>
            </View>
        </ActionSheetThemed>
    );
});

const UnblockPinDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global pt-10 items-start'>
                <ThemedText className='text-3xl font-bold mb-2'>Unblock PIN?</ThemedText>
                <ThemedText className='text-base mb-4'>If you enter the wrong PIN 3 times, your PIN gets blocked and your card won't work.</ThemedText>
                <View className="flex-row items-center justify-center gap-2 mt-6">
                    <Pressable className="px-3 py-4 rounded-full bg-highlight flex-1 items-center">
                        <Text className="text-base font-bold">Unblock now</Text>
                    </Pressable>
                </View>
            </View>
        </ActionSheetThemed>
    );
});