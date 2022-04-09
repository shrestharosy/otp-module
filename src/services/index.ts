import { BASE_URL } from 'src/config/index';

const validateOTP = async (otp: number) => {
    const resp = await fetch(`${BASE_URL}/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
    });
    const response = await resp.json();
    if (!resp.ok) {
        throw Error(response.message);
    }
    return response;
};

export const otpService = {
    validateOTP,
};
