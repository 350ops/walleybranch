import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import useThemeColors from '../contexts/ThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { authApi } from '../lib/auth-api';
import { countries, Country } from '../utils/countries';

export default function SignIn() {
    const [mode, setMode] = useState<'phone' | 'email'>('phone');
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to Qatar
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);

    const { signIn } = useAuth();
    const colors = useThemeColors();
    const router = useRouter();

    const handleNext = async () => {
        console.log('handleNext called, value:', value, 'mode:', mode);
        if (value.length === 0) return;

        if (mode === 'email') {
            // Email flow not implemented yet, just sign in
            console.log('Email mode, signing in with dummy token');
            signIn('dummy-email-token');
            return;
        }

        // Phone flow
        const phoneNumber = `${selectedCountry.dialCode}${value}`;
        console.log('Phone mode, starting verification for:', phoneNumber);
        setIsLoading(true);

        try {
            console.log('Calling authApi.sendOtp...');
            await authApi.sendOtp(phoneNumber);
            console.log('Verification sent successfully, navigating to verify-code');
            router.push({ pathname: '/verify-code', params: { phone: phoneNumber } });
        } catch (error: any) {
            console.error('Error in handleNext:', error);
            Alert.alert('Error', error.message || 'Failed to send verification code');
        } finally {
            console.log('Setting isLoading to false');
            setIsLoading(false);
        }
    };

    const renderCountryItem = ({ item }: { item: Country }) => (
        <TouchableOpacity
            style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                setSelectedCountry(item);
                setIsCountryPickerVisible(false);
            }}
        >
            <Text style={{ fontSize: 24, marginRight: 12 }}>{item.flag}</Text>
            <Text style={{ color: colors.text, fontSize: 16, flex: 1 }}>{item.name}</Text>
            <Text style={{ color: colors.secondary, fontSize: 16 }}>{item.dialCode}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, padding: 24 }}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-12">
                    <View></View>
                    <TouchableOpacity>
                        <Ionicons name="help-circle-outline" size={28} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={{ color: colors.text }} className="text-3xl font-bold mb-8">
                    Enter your {mode}
                </Text>

                {/* Input */}
                <View className="flex-row items-center border-b border-gray-300 pb-2 mb-4">
                    {mode === 'phone' && (
                        <TouchableOpacity
                            onPress={() => setIsCountryPickerVisible(true)}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}
                        >
                            <Text style={{ fontSize: 24, marginRight: 4 }}>{selectedCountry.flag}</Text>
                            <Text style={{ color: colors.text }} className="text-xl font-bold">
                                {selectedCountry.dialCode}
                            </Text>
                            <Ionicons name="chevron-down" size={16} color={colors.text} style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    )}
                    <TextInput
                        style={{ color: colors.text, fontSize: 20, flex: 1 }}
                        placeholder={mode === 'phone' ? "Phone Number" : "Email Address"}
                        placeholderTextColor={colors.placeholder}
                        keyboardType={mode === 'phone' ? 'phone-pad' : 'email-address'}
                        autoCapitalize="none"
                        value={value}
                        onChangeText={setValue}
                        autoFocus
                    />
                </View>

                {/* Helper Text */}
                <TouchableOpacity>
                    <Text style={{ color: '#FFFFFF' }} className="font-outfit-medium mt-4">
                        Need help logging in?
                    </Text>
                </TouchableOpacity>

                <View className="flex-1" />

                {/* Footer Buttons */}
                <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity
                        style={{ backgroundColor: colors.secondary, paddingVertical: 16, paddingHorizontal: 24, borderRadius: 30 }}
                        onPress={() => {
                            setMode(mode === 'phone' ? 'email' : 'phone');
                            setValue('');
                        }}
                    >
                        <Text style={{ color: colors.text, fontWeight: '600' }}>
                            Use {mode === 'phone' ? 'Email' : 'Phone'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: value.length > 0 ? colors.highlight : colors.secondary, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30 }}
                        onPress={handleNext}
                        disabled={value.length === 0 || isLoading}
                    >
                        <Text style={{ color: value.length > 0 ? 'black' : colors.text, fontWeight: '600' }}>
                            {isLoading ? 'Sending...' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Country Picker Modal */}
                <Modal
                    visible={isCountryPickerVisible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    onRequestClose={() => setIsCountryPickerVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: colors.bg }}>
                        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Select Country</Text>
                            <TouchableOpacity onPress={() => setIsCountryPickerVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={countries}
                            renderItem={renderCountryItem}
                            keyExtractor={(item) => item.code}
                        />
                    </View>
                </Modal>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
