import React from 'react';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Expandable from '@/components/Expandable';
import Section from '@/components/layout/Section';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import AnimatedView from '@/components/AnimatedView';
import Divider from '@/components/layout/Divider';

// FAQ data
const faqData = [
  {
    id: '1',
    question: 'How do I send money to someone?',
    answer: 'To send money, tap the "Send" button on your home screen. Enter the recipient\'s details, amount, and select a reason for the transfer. Review the details and confirm to complete the transaction.'
  },
  {
    id: '2',
    question: 'How long do transfers take?',
    answer: 'Domestic transfers typically complete within minutes to a few hours. International transfers may take 1-3 business days depending on the destination country and banking systems.'
  },
  {
    id: '3',
    question: 'What are the transfer limits?',
    answer: 'Daily limits vary based on your account verification level. Standard accounts can send up to $2,500 per day, while verified accounts can send up to $10,000 per day. Monthly limits also apply.'
  },
  {
    id: '4',
    question: 'How do I add money to my wallet?',
    answer: 'You can add money by linking your bank account, debit card, or credit card. Go to "Add Money" and choose your preferred funding source. Bank transfers are usually free, while card funding may have small fees.'
  },
  {
    id: '5',
    question: 'Is my money safe and secure?',
    answer: 'Yes! We use bank-level security with 256-bit encryption, two-factor authentication, and fraud monitoring. Your funds are protected by FDIC insurance up to $250,000 when held with our partner banks.'
  },
  {
    id: '6',
    question: 'What fees do you charge?',
    answer: 'Most transfers are free! We don\'t charge fees for standard bank transfers, receiving money, or account maintenance. Small fees may apply for instant transfers, international transfers, or card funding.'
  },
  {
    id: '7',
    question: 'How do I verify my account?',
    answer: 'To verify your account, provide your full name, date of birth, address, and Social Security number. You may also need to upload a photo ID. Verification typically takes 1-2 business days.'
  },
  {
    id: '8',
    question: 'Can I cancel a transfer?',
    answer: 'You can cancel pending transfers that haven\'t been processed yet. Once a transfer is completed and the recipient has received the funds, it cannot be reversed. Contact support immediately if you need assistance.'
  }
];

// Contact information
const contactInfo = [
  {
    id: 'email',
    type: 'Email Support',
    value: 'support@walley.com',
    icon: 'Mail' as const,
    action: () => Linking.openURL('mailto:support@walley.com')
  },
  {
    id: 'phone',
    type: 'Phone Support',
    value: '+1 (800) 555-WALL',
    icon: 'Phone' as const,
    action: () => Linking.openURL('tel:+18005559255')
  },
  {
    id: 'hours',
    type: 'Support Hours',
    value: '24/7 Customer Support',
    icon: 'Clock' as const,
    action: undefined
  }
];

export default function HelpScreen() {
  return (
    <View className="flex-1 bg-background dark:bg-dark-primary">
      <Header title="Help & Support" showBackButton />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <AnimatedView animation="fadeIn" duration={400}>
          {/* FAQ Section */}
          <Section 
            title="Frequently Asked Questions" 
            titleSize="xl" 
            className="px-global pt-6 pb-2"
          />
          
          <View className="px-global">
            {faqData.map((faq) => (
              <Expandable 
                key={faq.id}
                title={faq.question}
                className="py-1"
              >
                <ThemedText className="text-light-text dark:text-dark-text leading-6">
                  {faq.answer}
                </ThemedText>
              </Expandable>
            ))}
          </View>
          

          
          {/* Contact Section */}
          <Section 
            title="Contact Us" 
            titleSize="xl" 
            className="px-global pb-2 mt-14"
            subtitle="We're here to help with any questions or concerns"
          />
          
          <View className="px-global pb-8">
            {contactInfo.map((contact) => (
              <TouchableOpacity 
                key={contact.id}
                onPress={contact.action}
                disabled={!contact.action}
                className="flex-row items-center py-4 border-b border-border"
              >
                <View className="w-10 h-10 rounded-full bg-secondary items-center justify-center mr-4">
                  <Icon name={contact.icon} size={20} />
                </View>
                <View>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                    {contact.type}
                  </ThemedText>
                  <ThemedText className="font-medium">
                    {contact.value}
                  </ThemedText>
                </View>
                {contact.action && (
                  <Icon name="ChevronRight" size={20} className="ml-auto text-light-subtext dark:text-dark-subtext" />
                )}
              </TouchableOpacity>
            ))}
            
            <Button 
              title="Email Us" 
              iconStart="Mail"
              className="mt-8"
              onPress={() => Linking.openURL('mailto:support@walley.com')}
            />
          </View>
        </AnimatedView>
      </ScrollView>
    </View>
  );
}
