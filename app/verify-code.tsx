import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import useThemeColors from '../contexts/ThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { authApi } from '../lib/auth-api';

export default function VerifyCode() {
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const { signIn } = useAuth();
    const colors = useThemeColors();
    const router = useRouter();
    const { phone } = useLocalSearchParams<{ phone: string }>();

    const handleVerify = async () => {
        if (code.length !== 6) return;

        setIsVerifying(true);
        try {
            // Call Supabase API to verify code
            const { session } = await authApi.verifyOtp(phone, code);

            // Session is automatically handled by AuthContext via onAuthStateChange
            // But we can check if the user has a profile
            const profile = await authApi.getUserProfile();

            if (!profile) {
                // Navigate to profile setup if new user
                router.replace('/screens/profile-setup');
            } else {
                // Navigate home if existing user
                router.replace('/');
            }
        } catch (error: any) {
            Alert.alert('Verification Failed', error.message || 'Invalid code');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, padding: 24 }}
            >
                {/* Header */}
                <View className="flex-row items-center mb-12">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={{ color: colors.text }} className="text-3xl font-bold mb-4">
                    Enter the code
                </Text>
                <Text style={{ color: colors.secondary }} className="text-lg mb-8">
                    Sent to {phone}
                </Text>

                {/* Input */}
                <View className="flex-row items-center border-b border-gray-300 pb-2 mb-4">
                    <TextInput
                        style={{ color: colors.text, fontSize: 32, flex: 1, letterSpacing: 8, textAlign: 'center' }}
                        placeholder="000000"
                        placeholderTextColor={colors.placeholder}
                        keyboardType="number-pad"
                        maxLength={6}
                        value={code}
                        onChangeText={setCode}
                        autoFocus
                    />
                </View>

                <View className="flex-1" />

                {/* Footer Button */}
                <View className="items-center mb-4">
                    <TouchableOpacity
                        style={{
                            backgroundColor: code.length === 6 ? colors.highlight : colors.secondary,
                            paddingVertical: 16,
                            paddingHorizontal: 32,
                            borderRadius: 30,
                            width: '100%',
                            alignItems: 'center'
                        }}
                        onPress={handleVerify}
                        disabled={code.length !== 6 || isVerifying}
                    >
                        <Text style={{ color: code.length === 6 ? 'black' : colors.text, fontWeight: '600', fontSize: 18 }}>
                            {isVerifying ? 'Verifying...' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
