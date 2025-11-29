import { Dimensions, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import Icon from "./Icon";

export const CardPreview = (props: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    brand?: string;
    onSetDefault: () => void;
    onDelete: () => void;
}) => {
    const { width } = Dimensions.get('window');
    const isVisa = props.brand === 'Visa';

    return (
        <View
            style={{ height: width * 0.45, width: width * 0.75 }}
            className={`rounded-3xl shadow-sm ${isVisa ? 'bg-transparent-300' : 'bg-sky-300'}`}
        >
            <LinearGradient
                style={{ height: '100%', borderRadius: 24, padding: 24, justifyContent: 'space-between' }}
                colors={isVisa ? ['#ac004aff', '#2a5cffff'] : ['#74D4FF', '#e6e6e6ca']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Top Row: Chip and Contactless */}


                {/* Middle: Card Number */}
                <View className="mt-2">
                    <Text className="font-system text-xl font-bold tracking-widest text-black/90">
                        {props.cardNumber ? `•••• •••• •••• ${props.cardNumber}` : '•••• •••• •••• ••••'}
                    </Text>
                </View>

                {/* Bottom Row: Details and Logo */}
                <View className="flex-row justify-between items-end">
                    <View>
                        <Text className="text-[10px] font-medium text-black/60 uppercase mb-0.5">Expires</Text>
                        <Text className="font-system text-sm font-bold text-black/80">{props.expiryDate || 'MM/YY'}</Text>
                    </View>

                    {isVisa ? (
                        <Image
                            source={require('@/assets/img/visa.png')}
                            style={{ width: 60, height: 20 }}
                            resizeMode="contain"
                        />
                    ) : props.brand === 'Mastercard' ? (
                        <Image
                            source={require('@/assets/img/Mastercard.png')}
                            style={{ width: 60, height: 36 }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text className="text-xl font-bold italic text-black/80">{props.brand}</Text>
                    )}
                </View>
            </LinearGradient>
        </View>
    );
};