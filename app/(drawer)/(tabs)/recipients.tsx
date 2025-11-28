import Avatar from "@/components/Avatar";
import { CardScroller } from "@/components/CardScroller";
import Header, { HeaderIcon } from "@/components/Header";
import Section from "@/components/layout/Section";
import ThemedText from "@/components/ThemedText";
import ThemedScroller from "@/components/ThemeScroller";
import Icon from "@/components/Icon";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import AnimatedView from "@/components/AnimatedView";

export default function RecipientsScreen() {
    const recipients = [
        {
            id: '1',
            name: 'John Doe',
            src: require('@/assets/img/user-3.jpg'),
        },
        {
            id: '2',
            name: 'Sarah Wilson',
        },
        {
            id: '3',
            name: 'Mike Johnson',
            src: require('@/assets/img/user-1.jpg'),
        },
        {
            id: '4',
            name: 'Emma Davis',
        },
        {
            id: '5',
            name: 'Alex Chen',
            src: require('@/assets/img/user-2.jpg'),
        },
    ];

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

    ];

    return (
        <>
            <Header
                className='pt-10'
                rightComponents={[<HeaderIcon icon="Plus" href="/screens/add-recipient" />]}
            />
            <AnimatedView
                animation="scaleIn"
                className='flex-1 bg-background'
                duration={300}
            >
                <ThemedScroller className="flex-1 bg-background ">
                    <Section title="Recipients" titleSize="4xl" className=" mt-4" />
                    <SearchBar />
                    <Section title="Recent" titleSize="lg" className="mt-8">
                        <CardScroller>
                            {recipients.map((recipient) => (
                                <RecentRecipient key={recipient.id} name={recipient.name} src={recipient.src} />
                            ))}
                        </CardScroller>
                    </Section>

                    <Section title="All" titleSize="lg" className="mt-8">
                        {allRecipients.map((recipient) => (
                            <RecipientItem key={recipient.id} name={recipient.name} src={recipient.src} accountEnding={recipient.accountEnding} />
                        ))}

                    </Section>
                </ThemedScroller>
            </AnimatedView>
        </>
    );
}


const SearchBar = () => {
    return (
        <Link asChild href="/screens/search">
            <Pressable className="flex p-4 my-2 flex-row items-center rounded-full border border-text">
                <Icon name="Search" size={24} />
                <ThemedText className="text-lg  ml-4">Name, email, phone num...</ThemedText>
            </Pressable>
        </Link>
    );
}


const RecentRecipient = (props: any) => {
    return (
        <Link asChild href="/screens/user">
            <Pressable key={props.id} className="flex flex-col items-center w-[90px]">
                <Avatar
                    size="xl"
                    border={true}
                    src={props.src}
                    name={props.name}
                />
                <ThemedText className="text-sm font-bold mt-2 text-center">
                    {props.name}
                </ThemedText>
            </Pressable>
        </Link>
    );
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