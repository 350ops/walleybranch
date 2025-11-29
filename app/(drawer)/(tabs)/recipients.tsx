import React from 'react';
import { Pressable, View } from 'react-native';

import { Link } from 'expo-router';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { CardScroller } from '@/components/CardScroller';
import Header, { HeaderIcon } from '@/components/Header';
import Icon from '@/components/Icon';
import Section from '@/components/layout/Section';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import useRecipients from '@/hooks/useRecipients';

export default function RecipientsScreen() {
  const { recipients, recentRecipients, isLoading } = useRecipients();

  return (
    <>
      <Header
        className="pt-10"
        rightComponents={[<HeaderIcon icon="Plus" href="/screens/add-recipient" />]}
      />
      <AnimatedView animation="scaleIn" className="flex-1 bg-background" duration={300}>
        <ThemedScroller className="flex-1 bg-background ">
          <Section title="Recipients" titleSize="4xl" className=" mt-4" />
          <SearchBar />
          <Section title="Recent" titleSize="lg" className="mt-8">
            {recentRecipients.length === 0 ? (
              <ThemedText className="opacity-70">No recipients yet.</ThemedText>
            ) : (
              <CardScroller>
                {recentRecipients.map((recipient) => (
                  <RecentRecipient
                    key={recipient.id}
                    name={recipient.name}
                    src={recipient.avatar_url}
                  />
                ))}
              </CardScroller>
            )}
          </Section>

          <Section title="All" titleSize="lg" className="mt-8">
            {isLoading ? (
              <ThemedText className="opacity-70">Loading recipients...</ThemedText>
            ) : recipients.length === 0 ? (
              <ThemedText className="opacity-70">You have not added any recipients yet.</ThemedText>
            ) : (
              recipients.map((recipient) => (
                <RecipientItem
                  key={recipient.id}
                  name={recipient.name}
                  src={recipient.avatar_url}
                  accountEnding={recipient.account_last4}
                />
              ))
            )}
          </Section>
        </ThemedScroller>
      </AnimatedView>
    </>
  );
}

const SearchBar = () => {
  return (
    <Link asChild href="/screens/search">
      <Pressable className="my-2 flex flex-row items-center rounded-full border border-text p-4">
        <Icon name="Search" size={24} />
        <ThemedText className="ml-4  text-lg">Name, email, phone num...</ThemedText>
      </Pressable>
    </Link>
  );
};

const RecentRecipient = (props: any) => {
  return (
    <Link asChild href="/screens/user">
      <Pressable key={props.id} className="flex w-[90px] flex-col items-center">
        <Avatar size="xl" border src={props.src || undefined} name={props.name} />
        <ThemedText className="mt-2 text-center text-sm font-bold">{props.name}</ThemedText>
      </Pressable>
    </Link>
  );
};

const RecipientItem = (props: any) => {
  return (
    <Link asChild href="/screens/user">
      <Pressable className="mb-8 flex flex-row items-center">
        <Avatar size="lg" border src={props.src || undefined} name={props.name} />
        <View className="ml-4 flex flex-col">
          <ThemedText className="text-base font-bold">{props.name}</ThemedText>
          <ThemedText className="text-sm">
            {props.accountEnding ? `Account ending ${props.accountEnding}` : 'No account info'}
          </ThemedText>
        </View>
        <Icon name="ChevronRight" size={20} className="ml-auto opacity-50" />
      </Pressable>
    </Link>
  );
};
