import { OTP_LENGTH } from 'src/constants/index';

export const isValidInput = (inputValue: string): boolean => {
    return isValidNumber(inputValue) && isValidLength(inputValue);
};

export const isValidNumber = (inputValue: string, index?: number): boolean => {
    if (isNaN(+inputValue)) {
        return false;
    }

    if (inputValue.length === 0) {
        return false;
    }

    return true;
};

export const isValidLength = (inputValue: string) => {
    return inputValue.length === OTP_LENGTH;
};
