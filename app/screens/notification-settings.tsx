import { View } from "react-native";
import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import Switch from "@/components/forms/Switch";
import { useState } from "react";

export default function NotificationSettingsScreen() {
    const [transactionAlerts, setTransactionAlerts] = useState(true);
    const [paymentReceived, setPaymentReceived] = useState(true);
    const [lowBalance, setLowBalance] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);
    const [monthlyStatement, setMonthlyStatement] = useState(false);
    const [promotions, setPromotions] = useState(false);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller className="p-global">
                <Section title="Notification Settings" titleSize="4xl" className="mt-4 mb-10" />

                <Switch className="my-4" label="Transaction alerts" description="Get notified when money is sent or received" icon="Bell" value={transactionAlerts} onChange={setTransactionAlerts} />
                <Switch className="my-4" label="Payment received" description="Notifications when you receive payments" icon="DollarSign" value={paymentReceived} onChange={setPaymentReceived} />
                <Switch className="my-4" label="Low balance alerts" description="Get notified when your balance is running low" icon="AlertTriangle" value={lowBalance} onChange={setLowBalance} />
                <Switch className="my-4" label="Security alerts" description="Important security and account updates" icon="Shield" value={securityAlerts} onChange={setSecurityAlerts} />
                <Switch className="my-4" label="Monthly statements" description="Receive monthly account statements via email" icon="FileText" value={monthlyStatement} onChange={setMonthlyStatement} />
                <Switch className="my-4" label="Promotions & offers" description="Special offers and promotional notifications" icon="Gift" value={promotions} onChange={setPromotions} />
            </ThemedScroller>
        </>
    )
}

