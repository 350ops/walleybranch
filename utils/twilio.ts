// Replace these with your actual Twilio credentials
// WARNING: Storing these on the client is NOT secure for production apps.
const ACCOUNT_SID = process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN;
const SERVICE_SID = process.env.EXPO_PUBLIC_TWILIO_SERVICE_SID;

const BASIC_AUTH = btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);

export const sendSmsVerification = async (phoneNumber: string) => {
    try {
        console.log(`Sending SMS to ${phoneNumber}...`);
        const response = await fetch(
            `https://verify.twilio.com/v2/Services/${SERVICE_SID}/Verifications`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${BASIC_AUTH}`,
                },
                body: new URLSearchParams({
                    To: phoneNumber,
                    Channel: 'sms',
                }).toString(),
            }
        );

        console.log('Twilio API status:', response.status);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            if (!response.ok) {
                console.error('Twilio API Error:', data);
                throw new Error(data.message || 'Failed to send verification code');
            }
            return data;
        } else {
            const text = await response.text();
            console.error('Twilio API Non-JSON Response:', text);
            throw new Error(`Twilio API returned non-JSON response: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

export const checkVerificationCode = async (phoneNumber: string, code: string) => {
    try {
        console.log(`Verifying code for ${phoneNumber}...`);
        const response = await fetch(
            `https://verify.twilio.com/v2/Services/${SERVICE_SID}/VerificationCheck`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${BASIC_AUTH}`,
                },
                body: new URLSearchParams({
                    To: phoneNumber,
                    Code: code,
                }).toString(),
            }
        );

        console.log('Twilio API status:', response.status);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            if (!response.ok) {
                console.error('Twilio API Error:', data);
                throw new Error(data.message || 'Failed to verify code');
            }
            if (data.status !== 'approved') {
                throw new Error('Invalid verification code');
            }
            return data;
        } else {
            const text = await response.text();
            console.error('Twilio API Non-JSON Response:', text);
            throw new Error(`Twilio API returned non-JSON response: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        throw error;
    }
};
