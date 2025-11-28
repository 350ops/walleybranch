import Header from "@/components/Header";
import ThemedScroller from "@/components/ThemeScroller";
import Section from "@/components/layout/Section";
import Switch from "@/components/forms/Switch";
import { useState } from "react";

export default function CardControlsScreen() {
    const [onlinePayments, setOnlinePayments] = useState(true);
    const [magneticStripe, setMagneticStripe] = useState(false);
    const [contactless, setContactless] = useState(true);
    const [chipTransactions, setChipTransactions] = useState(false);
    const [mobileWallet, setMobileWallet] = useState(false);
    const [cashWithdrawals, setCashWithdrawals] = useState(false);

    return (
        <>
            <Header showBackButton />
            <ThemedScroller>
                <Section title="Card Controls" titleSize="4xl" className="mt-4 mb-10" />

                <Switch className="my-4" label="Online payments" description="Pay for goods and services on the internet" icon="Globe" value={onlinePayments} onChange={setOnlinePayments} />
                <Switch className="my-4" label="Magnetic stripe" description="Swipe your card with a machine to pay or withdraw" icon="CreditCard" value={magneticStripe} onChange={setMagneticStripe} />
                <Switch className="my-4" label="Contactless" description="Tap your physical card to pay or withdraw cash" icon="Wifi" value={contactless} onChange={setContactless} />
                <Switch className="my-4" label="Chip transactions" description="Insert your card into a machine to pay or withdraw cash" icon="Car" value={chipTransactions} onChange={setChipTransactions} />
                <Switch className="my-4" label="Mobile wallet" description="Use your mobile device to pay or withdraw cash" icon="Smartphone" value={mobileWallet} onChange={setMobileWallet} />
                <Switch className="my-4" label="Cash withdrawals" description="Use contactless, chip or magnetic stripe to withdraw at ATMs" icon="Banknote" value={cashWithdrawals} onChange={setCashWithdrawals} />
            </ThemedScroller>
        </>
    )
}
