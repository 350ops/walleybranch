import { Image, View } from "react-native";
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import ThemedFooter from "@/components/ThemeFooter";
import { Button } from "@/components/Button";
import React from "react";
import ThemedText from "@/components/ThemedText";

export default function LinkScreen() {


    return (
        <>
            <Header showBackButton />
            <ThemedScroller className="flex-1">
                <ThemedText className="text-4xl font-bold text-center mt-4">Share link or QR code</ThemedText>
                <ThemedText className="text-base text-center">Request a payment from someone</ThemedText>
                <View className="w-full flex-1 flex-row items-center justify-center">
                    <Image source={require('@/assets/img/qr.png')} className="w-52 h-52 rounded-2xl mt-8" />
                </View>
            </ThemedScroller>
            <ThemedFooter className="flex-row gap-2">
                <Button rounded="full" title="Copy link" size="large" className="flex-1" variant="outline" />
                <Button rounded="full" title="Share QR code" size="large" className="flex-1 !bg-highlight" textClassName="!text-black" />
            </ThemedFooter>

        </>
    )
}