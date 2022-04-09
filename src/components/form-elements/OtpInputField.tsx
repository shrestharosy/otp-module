import { useEffect, useRef, useState } from 'react';

interface IOTPInputFieldProps {
    index: number;
    activeInputIndex: number;
    otp: string[];
    isSubmitted: boolean;
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
        isSubmitted,
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

    const isValidInput = (input: string) => {
        return input?.length === 0 ? false : !isNaN(+input);
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
        setActiveInputIndex(index + 1);
    };

    const focusPreviousInput = () => {
        setActiveInputIndex(activeInputIndex - 1);
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

    return (
        <>
            <input
                name={`otp-${index}`}
                className={`otp-input ${
                    isSubmitted && !isValidInput(value) && 'otp-input-error'
                }`}
                type="number"
                maxLength={1}
                value={value ?? ''}
                ref={otpInputRef}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setActiveInputIndex(0)}
                onKeyDown={handleKeyDownEvent}
                onPaste={handleOnPaste}
            />
        </>
    );
};

export default OTPInputField;
