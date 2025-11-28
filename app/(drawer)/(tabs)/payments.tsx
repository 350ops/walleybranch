import Header, { HeaderIcon } from "@/components/Header";
import Section from "@/components/layout/Section";
import ListLink from "@/components/ListLink";
import ThemedScroller from "@/components/ThemeScroller";
import { AnimatedBarChart } from "@/components/AnimatedBarChart";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import AnimatedView from "@/components/AnimatedView";

export default function PaymentsScreen() {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const expensesData = [
        { month: 'Jan', value: 2.8 },
        { month: 'Feb', value: 4.2 },
        { month: 'Mar', value: 3.1 },
        { month: 'Apr', value: 5.7, isHighlighted: true },
        { month: 'May', value: 3.9 },
        { month: 'Jun', value: 3.2 },
        { month: 'Jul', value: 3.0 },
    ];

    useFocusEffect(
        useCallback(() => {
            // Only animate on first visit
            if (!hasAnimated) {
                setShouldAnimate(true);
                setHasAnimated(true);
            }
        }, [hasAnimated])
    );

    return (
        <>
            <Header
                className='pt-10'
            />
            <AnimatedView
                animation="scaleIn"
                className='flex-1 bg-background'
                duration={300}
            >
                <ThemedScroller>
                    <Section title="Payments" titleSize="4xl" className="mt-10 mb-4" />
                    <View className="w-full h-[300px] relative">
                        <AnimatedBarChart data={expensesData} animate={shouldAnimate} />
                    </View>
                    <ListLink title="Direct debits" description="1 active" icon="RotateCw" href="/screens/direct-debits" showChevron />
                    <ListLink title="Recurring card payments" description="10 active" icon="RotateCw" href="/screens/reccuring" showChevron />
                    <ListLink title="Scheduled transfers" description="Set up a transfer to send at a later date" icon="Calendar" href="/screens/scheduled-payments" showChevron />
                    <ListLink title="Payement requests" description="Create and manage payments you've requested" icon="HandCoins" href="/screens/payment-requests" showChevron />

                    <Section title="Payment tools" className="mt-8">
                        <ListLink title="Your account" description="@johndoe" icon="RotateCw" href="/screens/profile" showChevron />
                        <ListLink href="/screens/link" title="Send via  link" description="Create and manage links" icon="Link2" showChevron />

                    </Section>
                </ThemedScroller>
            </AnimatedView>
        </>
    );
}