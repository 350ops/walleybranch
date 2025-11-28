import { View, Image, ScrollView, Pressable, TextInput, Text } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Avatar from '@/components/Avatar';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import Section from '@/components/layout/Section';
import useThemeColors from "@/contexts/ThemeColors";
import MultiStep, { Step } from '@/components/MultiStep';
import { router } from 'expo-router';
import Select from '@/components/forms/Select';
import Input from '@/components/forms/Input';
import { CardPreview } from '@/components/CardPreview';

export default function AddCardScreen() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    // Function to detect card brand based on card number
    const detectCardBrand = (number: string) => {
        const cleanNumber = number.replace(/\s/g, '');
        if (cleanNumber.startsWith('4')) return 'Visa';
        if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
        if (cleanNumber.startsWith('3')) return 'Amex';
        return 'Visa'; // Default
    };

    // Function to format card number with spaces
    const formatCardNumber = (value: string) => {
        const cleanValue = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
        const formattedValue = cleanValue.replace(/(.{4})/g, '$1 ').trim();
        return formattedValue.substring(0, 19); // Max 16 digits + 3 spaces
    };

    // Function to format expiry date
    const formatExpiryDate = (value: string) => {
        const cleanValue = value.replace(/[^0-9]/g, '');
        if (cleanValue.length >= 2) {
            return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
        }
        return cleanValue;
    };

    // Get last 4 digits for preview
    const getLastFourDigits = (number: string) => {
        const cleanNumber = number.replace(/\s/g, '');
        return cleanNumber.length >= 4 ? cleanNumber.slice(-4) : cleanNumber;
    };

    const handleCardNumberChange = (value: string) => {
        const formatted = formatCardNumber(value);
        setCardNumber(formatted);
    };

    const handleExpiryChange = (value: string) => {
        const formatted = formatExpiryDate(value);
        setExpiryDate(formatted);
    };

    const handleSave = () => {
        // Handle save logic here
        router.back();
    };

    return (
        <>
            <Header
                showBackButton
                title='Add New Card'
                rightComponents={[<Button title="Save" onPress={handleSave} />]}
            />

            <ThemedScroller>
                <View className='w-full items-center justify-center py-8'>
                    <CardPreview
                        cardNumber={getLastFourDigits(cardNumber)}
                        cardHolder={cardHolder}
                        expiryDate={expiryDate || 'MM/YY'}
                        brand={detectCardBrand(cardNumber)}
                        onSetDefault={() => { }}
                        onDelete={() => { }}
                    />
                </View>

                <Section title="Card Information" className='mt-10'>
                    <Input

                        label="Card number"
                        value={cardNumber}
                        onChangeText={handleCardNumberChange}
                        keyboardType="numeric"
                        containerClassName='mt-6'
                    //maxLength={19}
                    />

                    <Input

                        label="Cardholder name"
                        value={cardHolder}
                        onChangeText={setCardHolder}
                        containerClassName='mt-0'
                    />
                    <View className='flex-row gap-4'>
                        <Input
                            placeholder='MM/YY'
                            label="Expiry date"
                            value={expiryDate}
                            onChangeText={handleExpiryChange}
                            keyboardType="numeric"
                            maxLength={5}
                            containerClassName='mt-0 flex-1'
                        />
                        <Input
                            placeholder='123'
                            label="CVV"
                            value={cvv}
                            onChangeText={setCvv}
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                            containerClassName='mt-0 flex-1'
                        />
                    </View>
                </Section>

                <Section title="Billing Information" className='mt-10'>
                    <Input
                        placeholder='123 Main St, New York, NY 10001'
                        label="Billing address"
                        value={billingAddress}
                        onChangeText={setBillingAddress}
                        containerClassName='mt-4'
                    />
                </Section>
            </ThemedScroller>
        </>
    );
}

