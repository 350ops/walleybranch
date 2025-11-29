import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useState } from 'react';
import { Button } from '@/components/Button';
import Section from '@/components/layout/Section';
import Input from '@/components/forms/Input';
import { Alert } from 'react-native';
import useRecipients from '@/hooks/useRecipients';
import { router } from 'expo-router';

export default function AddRecipientScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accountLast4, setAccountLast4] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { addRecipient } = useRecipients();

  const handleSave = async () => {
    if (!firstName) {
      Alert.alert('Missing info', 'First name is required');
      return;
    }

    setIsSaving(true);
    try {
      await addRecipient({
        name: (nickname || `${firstName} ${lastName}`).trim(),
        email: email || undefined,
        phone: phone || undefined,
        account_last4: accountLast4 || undefined,
        avatar_url: undefined,
      });
      Alert.alert('Recipient added', `${firstName} has been added to your contacts.`);
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save recipient');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header
        showBackButton
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
        <Section
          title="Add Recipient"
          subtitle="Add a new contact to your wallet"
          titleSize="4xl"
          className=" mt-4"
        />

        <Section title="Basic info" className="mt-10">
          <Input
            label="First name"
            containerClassName="mt-4"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            label="Last name"
            containerClassName="mt-0"
            value={lastName}
            onChangeText={setLastName}
          />
          <Input
            label="Nickname"
            containerClassName="mt-0"
            value={nickname}
            onChangeText={setNickname}
          />
        </Section>

        <Section title="Contact" className="mt-10">
          <Input
            label="Email"
            containerClassName="mt-4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            label="Phone"
            containerClassName="mt-0"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </Section>

        <Section title="Account" className="mt-10">
          <Input
            label="Account ending"
            placeholder="1234"
            containerClassName="mt-4"
            value={accountLast4}
            onChangeText={setAccountLast4}
            maxLength={4}
            keyboardType="numeric"
          />
        </Section>
      </ThemedScroller>
    </>
  );
}
