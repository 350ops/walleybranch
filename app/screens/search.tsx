
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeColors from "@/contexts/ThemeColors";
import { View, TextInput, Pressable } from "react-native";
import Icon from "@/components/Icon";
import { Link, router } from "expo-router";
import ThemedText from "@/components/ThemedText";
import Avatar from "@/components/Avatar";

export default function SearchScreen() {
    const allRecipients = [
        {
            id: '1',
            name: 'John Doe',
            src: require('@/assets/img/user-3.jpg'),
            accountEnding: '1234',
        },
        {
            id: '2',
            name: 'Sarah Wilson',
            accountEnding: '5678',
        },
        {
            id: '3',
            name: 'Mike Johnson',
            src: require('@/assets/img/user-1.jpg'),
            accountEnding: '9012',
        },
        {
            id: '4',
            name: 'Emma Davis',
            src: require('@/assets/img/user-2.jpg'),
            accountEnding: '3456',
        },
        {
            id: '5',
            name: 'Alex Chen',
            accountEnding: '7890',
        },
        {
            id: '6',
            name: 'John Doe',
            accountEnding: '7890',
        },
        {
            id: '7',
            name: 'Sarah Wilson',
            accountEnding: '5678',
        },
        {
            id: '8',
            name: 'Mike Johnson',
            src: require('@/assets/img/user-1.jpg'),
            accountEnding: '9012',
        },
        {
            id: '9',
            name: 'Emma Davis',
            src: require('@/assets/img/user-2.jpg'),
            accountEnding: '3456',
        },
        {
            id: '10',
            name: 'Alex Chen',
            accountEnding: '7890',
        },
        {
            id: '11',
            name: 'John Doe',
            accountEnding: '7890',
        },

    ];
    return (
        <>
            <SearchInput />
            <ThemedScroller className="pt-14">

                {allRecipients.map((recipient) => (
                    <RecipientItem key={recipient.id} name={recipient.name} src={recipient.src} accountEnding={recipient.accountEnding} />
                ))}
            </ThemedScroller>
        </>
    )
}


const SearchInput = () => {
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();
    return (
        <View style={{ paddingTop: insets.top }} className='flex-row px-4 pb-4 items-center  justify-between'>
            <View className='relative h-14 flex-1 flex-row  border border-text rounded-full'>
                <Icon name='ArrowLeft' onPress={() => router.back()} size={20} className='pl-2' />
                <TextInput className='flex-1 h-14 text-text rounded-xl px-4' placeholder='Search recipients' placeholderTextColor={colors.placeholder} />
            </View>
        </View>
    )
}


const RecipientItem = (props: any) => {
    return (
        <Link asChild href="/screens/user">
            <Pressable className="flex flex-row items-center mb-8">
                <Avatar size="lg" border={true} src={props.src} name={props.name} />
                <View className="flex flex-col ml-4">
                    <ThemedText className="text-base font-bold">
                        {props.name}
                    </ThemedText>
                    <ThemedText className="text-sm">
                        US account ending {props.accountEnding}
                    </ThemedText>
                </View>
                <Icon name="ChevronRight" size={20} className="ml-auto opacity-50" />
            </Pressable>
        </Link>
    );
}
