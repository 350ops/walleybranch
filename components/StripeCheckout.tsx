import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useSupabaseData } from '@/contexts/DataContext';
import { supabase } from '@/lib/supabase';
import useThemeColors from '@/contexts/ThemeColors';

export default function StripeCheckout() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { setBalance, account } = useSupabaseData();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        const { data, error } = await supabase.functions.invoke('payment-sheet', {
            body: { amount: 500 }, // $5.00
        });

        if (error) {
            Alert.alert('Error fetching payment params', error.message);
            return {};
        }

        return {
            paymentIntent: data.paymentIntent,
            ephemeralKey: data.ephemeralKey,
            customer: data.customer,
        };
    };

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Piper App',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            },
            returnURL: 'piper://stripe-redirect',
            applePay: {
                merchantCountryCode: 'US',
            },
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        setLoading(true);
        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            if (account) {
                setBalance(account.balance + 500); // Add $5.00
            }
        }
        setLoading(false);
    };

    const colors = useThemeColors();

    return (
        <Pressable
            onPress={openPaymentSheet}
            style={{ backgroundColor: colors.highlight }}
            className="mx-global mt-4 self-center rounded-full px-6 py-3">
            <Text className="font-semibold text-black">Add Funds with Stripe</Text>
        </Pressable>
    );
}
