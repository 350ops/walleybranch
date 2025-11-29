import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';
import Input from '@/components/forms/Input';
import { CardPreview } from '@/components/CardPreview';
import { Button } from '@/components/Button';
import ThemedText from '@/components/ThemedText';
import useCards from '@/hooks/useCards';

export default function AddCardScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { addCard, cards } = useCards();

  const detectCardBrand = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'Amex';
    return 'Visa';
  };

  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    const formattedValue = cleanValue.replace(/(.{4})/g, '$1 ').trim();
    return formattedValue.substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue.length >= 2) {
      return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
    }
    return cleanValue;
  };

  const getLastFourDigits = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    return cleanNumber.length >= 4 ? cleanNumber.slice(-4) : cleanNumber;
  };

  const handleCardNumberChange = (value: string) => setCardNumber(formatCardNumber(value));
  const handleExpiryChange = (value: string) => setExpiryDate(formatExpiryDate(value));

  const handleSave = async () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 12) {
      Alert.alert('Invalid card', 'Please enter a valid card number');
      return;
    }

    if (!expiryDate || expiryDate.length !== 5) {
      Alert.alert('Invalid expiry date', 'Expiry date should be in MM/YY format');
      return;
    }

    const cleanNumber = cardNumber.replace(/\s/g, '');
    const last4 = cleanNumber.slice(-4);
    const [monthStr, yearStr] = expiryDate.split('/');
    const expiryMonth = parseInt(monthStr, 10);
    const expiryYear = 2000 + parseInt(yearStr, 10);

    if (!expiryMonth || expiryMonth < 1 || expiryMonth > 12) {
      Alert.alert('Invalid expiry date', 'Please provide a valid month');
      return;
    }

    setIsSaving(true);
    try {
      const brand = detectCardBrand(cleanNumber);
      const color = brand === 'Mastercard' ? 'sunset' : 'midnight';

      await addCard({
        card_number_last4: last4,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        card_brand: brand,
        color_scheme: color,
        nickname: cardHolder || billingAddress || undefined,
        is_default: cards.length === 0,
      });
      Alert.alert('Success', 'Card added successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add card');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header
        showBackButton
        title="Add New Card"
        rightComponents={[
          <Button
            key="save"
            title={isSaving ? 'Saving...' : 'Save'}
            onPress={handleSave}
            disabled={isSaving}
          />,
        ]}
      />

      <ThemedScroller>
        <View className="w-full items-center justify-center py-8">
          <CardPreview
            cardNumber={getLastFourDigits(cardNumber)}
            cardHolder={cardHolder}
            expiryDate={expiryDate || 'MM/YY'}
            brand={detectCardBrand(cardNumber)}
            onSetDefault={() => {}}
            onDelete={() => {}}
          />
        </View>

        <Section title="Card Information" className="mt-10">
          <Input
            label="Card number"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
            containerClassName="mt-6"
          />

          <Input
            label="Cardholder name"
            value={cardHolder}
            onChangeText={setCardHolder}
            containerClassName="mt-0"
          />
          <View className="flex-row gap-4">
            <Input
              placeholder="MM/YY"
              label="Expiry date"
              value={expiryDate}
              onChangeText={handleExpiryChange}
              keyboardType="numeric"
              maxLength={5}
              containerClassName="mt-0 flex-1"
            />
            <Input
              placeholder="123"
              label="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              containerClassName="mt-0 flex-1"
            />
          </View>
        </Section>

        <Section title="Billing Information" className="mt-10">
          <Input
            placeholder="123 Main St, New York, NY 10001"
            label="Billing address"
            value={billingAddress}
            onChangeText={setBillingAddress}
            containerClassName="mt-4"
          />
          <ThemedText className="mt-2 text-xs opacity-60">
            Billing details are stored locally for now and help personalize your experience.
          </ThemedText>
        </Section>
      </ThemedScroller>
    </>
  );
}
