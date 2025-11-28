import { useThemeColors } from "@/app/contexts/ThemeColors";
import ThemedText from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, View, ImageSourcePropType, Pressable } from "react-native";

interface TransactionItemProps {
    title: string;
    amount: string;
    method: string;
    time: string;
    isIncome?: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
    avatar?: string | ImageSourcePropType;
}

export const TransactionItem = ({ title, amount, method, time, isIncome, icon, avatar }: TransactionItemProps) => {
    const colors = useThemeColors();
    return (
        <Link asChild href="/screens/transaction">
            <Pressable className='flex-row items-center justify-start py-3'>
                <View className='w-14 h-14 bg-secondary rounded-full items-center justify-center mr-3'>
                    {icon && <AntDesign name={icon} size={24} color={colors.text} />}
                    {avatar && <Image source={typeof avatar === 'string' ? { uri: avatar } : avatar} className='w-full h-full rounded-full object-cover' />}
                </View>
                <View>
                    <ThemedText className='text-text text-lg font-bold'>{title}</ThemedText>
                    <ThemedText className='text-text text-sm opacity-55'>{time}</ThemedText>
                </View>
                <View className='ml-auto items-end'>
                    <ThemedText className={`text-text text-lg font-semibold ${isIncome ? 'text-green-500' : 'text-text'}`}>{amount}</ThemedText>
                    <ThemedText className='text-text text-sm opacity-55'>{method}</ThemedText>
                </View>
            </Pressable >
        </Link>
    )
}