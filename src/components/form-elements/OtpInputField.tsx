import { useEffect, useRef, useState } from 'react';
import { OTP_LENGTH } from 'src/constants';
import { isValidNumber } from 'src/utils';

interface IOTPInputFieldProps {
    index: number;
    activeInputIndex: number;
    otp: string[];
    isSubmitting: boolean;
    formError: string;
    setActiveInputIndex: (index: number) => void;
    handleOnPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
    defaultValue?: string | null;
}

const OTPInputField = (props: IOTPInputFieldProps) => {
    const {
        index,
        activeInputIndex,
        defaultValue,
        otp,
        isSubmitting,
        formError,
        setActiveInputIndex,
        handleOnPaste,
        setOtp,
    } = props;

    const [value, setValue] = useState<string>('');

    const otpInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (activeInputIndex === index) {
            otpInputRef?.current?.focus();
        }
    }, [activeInputIndex, index]);

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const input = e.currentTarget.value;
        handleFocusOnInputChange(input);
        setInOTPArray(input);
    };

    const setInOTPArray = (input: string) => {
        const cleanedInput = cleanupInput(input);
        otp[index - 1] = cleanedInput;
        setOtp(otp);
    };

    const cleanupInput = (inputValue: string): string => {
        const inputLength = inputValue.length;

        switch (inputLength) {
            case 0:
                return '';
            case 1:
                return inputValue;
            default:
                return inputValue.charAt(0);
        }
    };

    const handleFocus = () => {
        setActiveInputIndex(index);
        otpInputRef.current?.select();
    };

    const handleFocusOnInputChange = (inputValue: string) => {
        const inputLength = inputValue.length;

        switch (inputLength) {
            case 0:
                setValue('');
                setInOTPArray('');
                break;
            case 1:
                setValue(inputValue);
                setInOTPArray(inputValue);
                focusNextInput();
                break;
            default:
                setValue(inputValue.charAt(0));
                focusNextInput();
                return false;
        }
    };

    const focusNextInput = () => {
        if (index <= OTP_LENGTH - 1) {
            setActiveInputIndex(index + 1);
        }
    };

    const focusPreviousInput = () => {
        if (activeInputIndex > 1 && activeInputIndex <= OTP_LENGTH) {
            setActiveInputIndex(activeInputIndex - 1);
        }
    };

    const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keys = ['+', '-', 'e', 'E', '.'];
        const pressedKey = e.key;

        console.log(pressedKey);

        if (keys.includes(pressedKey)) {
            e.preventDefault();
        }

        switch (pressedKey) {
            case 'Backspace':
                setValue('');
                setInOTPArray('');
                focusPreviousInput();
                break;
            case 'Delete':
                setValue('');
                setInOTPArray('');
                focusPreviousInput();
                break;
            case 'ArrowRight':
                focusNextInput();
                break;
            case 'ArrowLeft':
                focusPreviousInput();
                break;
            default:
                break;
        }
    };

    const showErrorMessage = () =>
        (isSubmitting || formError) &&
        !isValidNumber(value) &&
        index === OTP_LENGTH;

    const highlightInputError = () =>
        (isSubmitting || formError) && !isValidNumber(value, index);

    return (
        <>
            <input
                name={`otp-${index}`}
                className={`otp-input ${
                    highlightInputError() && 'otp-input-error'
                }`}
                type='number'
                maxLength={1}
                value={value ?? ''}
                ref={otpInputRef}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setActiveInputIndex(0)}
                onKeyDown={handleKeyDownEvent}
                onPaste={handleOnPaste}
            />
            {showErrorMessage() && (
                <div className='text-error'>{formError}</div>
            )}
        </>
    );
};

export default OTPInputField;
