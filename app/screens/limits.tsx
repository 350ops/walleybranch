import { View } from "react-native";
import ThemedText from "@/components/ThemedText";
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import ProgressBar from "@/components/ProgressBar";
import ThemedFooter from "@/components/ThemeFooter";
import { Button } from "@/components/Button";
import React, { useRef, useState } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import ActionSheetThemed from "@/components/ActionSheetThemed";
import Slider from "@/components/forms/Slider";

export default function LimitsScreen() {
    const limitIncreaseDrawerRef = useRef<ActionSheetRef>(null);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className="flex-1">
                <Section title="Withdrawal limits" subtitle="Set the maximum amount you can withdraw at a time" titleSize="4xl" className="mt-4 mb-14" />
                <View className="border-b border-border pb-10">
                    <ThemedText className="text-xl font-bold">Daily limit - 4,000 USD</ThemedText>
                    <ThemedText className="mb-6">Refreshes in 13 hours</ThemedText>
                    <ProgressBar percentage={50} />
                    <ThemedText className="mt-6 text-right">2,000 EUR remaining</ThemedText>
                </View>

                <View className="pb-10 mt-10">
                    <ThemedText className="text-xl font-bold">Monthly limit - 10,000 USD</ThemedText>
                    <ThemedText className="mb-6">Refreshes in 13 hours</ThemedText>
                    <ProgressBar percentage={80} />
                    <ThemedText className="mt-6 text-right">2,000 EUR remaining</ThemedText>
                </View>

            </ThemedScroller>
            <ThemedFooter>

                <Button size="large" onPress={() => limitIncreaseDrawerRef.current?.show()} className="!bg-highlight" textClassName="text-black" title="Increase limit" rounded="full" />
            </ThemedFooter>

            <LimitIncreaseDrawer ref={limitIncreaseDrawerRef} />
        </>
    )
}

const LimitIncreaseDrawer = React.forwardRef<ActionSheetRef>((props, ref) => {
    const [value, setValue] = useState(3000);
    const limitIncreaseDrawerRef = useRef<ActionSheetRef>(null);
    return (
        <ActionSheetThemed
            gestureEnabled
            ref={ref}>
            <View className='p-global pt-10 items-start'>
                <ThemedText className='text-3xl font-bold'>Change limits</ThemedText>
                <ThemedText className='text-base text-center mb-10'>Set the maximum amount you can withdraw at a time</ThemedText>
                <Slider minValue={1000} maxValue={9000} value={value} onValueChange={setValue} />
                <View className="flex-row justify-between w-full">
                    <ThemedText className="text-sm">1000 USD</ThemedText>
                    <ThemedText className="text-xl font-bold">{value} USD</ThemedText>
                    <ThemedText className="text-sm">9000 USD</ThemedText>
                </View>
                

            </View>
            <View className="w-full flex-row px-global mt-10">
                    <Button size="large" onPress={() => limitIncreaseDrawerRef.current?.hide()} className="!bg-highlight w-full flex-1" textClassName="text-black" title="Increase limit" rounded="full" />
                </View>
        </ActionSheetThemed>
    );
});
