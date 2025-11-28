import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import React from "react";
import { View } from "react-native";
import ThemedText from "@/components/ThemedText";
import Icon from "@/components/Icon";
import { IconName } from "@/components/Icon";

interface StatementData {
    month: string;
    transactionCount: number;
}

interface YearlyStatements {
    year: number;
    statements: StatementData[];
}

export default function StatementsScreen() {
    const statementsData: YearlyStatements[] = [
        {
            year: 2025,
            statements: [
                { month: "January", transactionCount: 18 },
                { month: "February", transactionCount: 21 },
                { month: "March", transactionCount: 27 },
                { month: "April", transactionCount: 19 },
                { month: "May", transactionCount: 33 },
                { month: "June", transactionCount: 26 },
                { month: "July", transactionCount: 20 },
            ]
        },
        {
            year: 2024,
            statements: [
                { month: "December", transactionCount: 24 },
                { month: "November", transactionCount: 31 },
                { month: "October", transactionCount: 28 },
                { month: "September", transactionCount: 22 },
                { month: "August", transactionCount: 35 },
                { month: "July", transactionCount: 20 },
                { month: "June", transactionCount: 26 },
                { month: "May", transactionCount: 33 },
                { month: "April", transactionCount: 19 },
                { month: "March", transactionCount: 27 },
                { month: "February", transactionCount: 21 },
                { month: "January", transactionCount: 29 },
            ]
        }
    ];

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className="p-global">
                <Section title="Statements and reports" subtitle="Download your statements and reports" titleSize="4xl" className="mt-4 mb-10" />
                
                {statementsData.map((yearData) => (
                    <View key={yearData.year} className="mb-8">
                        <ThemedText className="text-lg font-semibold mb-4">{yearData.year}</ThemedText>
                        {yearData.statements.map((statement, index) => (
                            <Statement 
                                key={`${yearData.year}-${statement.month}`}
                                icon="File" 
                                title={`${statement.month} ${yearData.year}`} 
                                description={`${statement.transactionCount} Transactions`} 
                                showChevron={false} 
                                rightIcon="ChevronRight" 
                            />
                        ))}
                    </View>
                ))}
            </ThemedScroller>
        </>
    )
}

const Statement = (props: { icon: IconName, title: string, description: string, showChevron: boolean, rightIcon: IconName }) => {
    return (
        <View className={`flex-row items-center py-4 `}>
            <View className="mr-4 h-12 w-12 rounded-full border border-border items-center justify-center">
                <Icon name={props.icon} size={20} />
            </View>
            <View className="flex-1">
                <ThemedText className="text-lg font-semibold">{props.title}</ThemedText>
                <ThemedText className="text-sm">
                    {props.description}
                </ThemedText>
            </View>
            <Icon name="Download" size={20} />

        </View>
    )
}


