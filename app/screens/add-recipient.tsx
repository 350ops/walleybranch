import Header, { HeaderIcon } from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import Section from '@/components/layout/Section';
import Input from '@/components/forms/Input';

export default function AddRecipientScreen() {
    return (
        <>
            <Header showBackButton rightComponents={[<Button title="Save changes" />]}
            />

            <ThemedScroller>
                <Section title="Add Recipient" subtitle='Add a new recipient to your wallet' titleSize="4xl" className=" mt-4" />

                <Section title="Basic info" className='mt-10'>

                    <Input  label="First name" containerClassName='mt-4' />
                    <Input label="Last name" containerClassName='mt-0' />
                    <Input label="Nickname" containerClassName='mt-0' />
                </Section>

                <Section title="Account" className='mt-10'>

                    <Input label="Account number" containerClassName='mt-4' />
                    <Input  label="Billing address" containerClassName='mt-0' />
                    <Input  label="Nickname" containerClassName='mt-0' />
                </Section>
            </ThemedScroller>

        </>
    );
}

