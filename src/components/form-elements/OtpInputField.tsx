import { useEffect, useRef, useState } from "react";

interface IOTPInputFieldProps {
    index: number
    activeInputIndex: number
    setActiveInputIndex: (index: number) => void
}

const OTPInputField = (props: IOTPInputFieldProps) => {
    const { index, activeInputIndex, setActiveInputIndex } = props

    const [value, setValue] = useState<string>('')

    const otpInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (activeInputIndex === index) {
            otpInputRef?.current?.focus();
        }
    }, [activeInputIndex, index]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO : get form values

        handleFocusOnInputChange(e.currentTarget.value)

    };

    const handleFocus = () => {
        setActiveInputIndex(index);
        otpInputRef.current?.select();
    }

    const handleFocusOnInputChange = (inputValue: string) => {
        const inputLength = inputValue.length;

        switch (inputLength) {
            case 0:
                setValue('');
                break;
            case 1:
                setValue(inputValue)
                focusNextInput();
                break;
            default:
                focusNextInput();
                return false
        }
    }

    const focusNextInput = () => {
        setActiveInputIndex(index + 1);

    }

    const focusPreviousInput = () => {
        setActiveInputIndex(activeInputIndex - 1)
    }

    const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keys = ['+', '-', 'e', 'E', '.'];
        const pressedKey = e.key

        console.log(pressedKey)

        if (keys.includes(pressedKey)) {
            e.preventDefault();
        }

        switch (pressedKey) {
            case 'Backspace':
                setValue('');
                focusPreviousInput();
                break;
            case 'Delete':
                setValue('');
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
    }

    return (
        <>
            <input
                name={`otp-${index}`}
                type="number"
                maxLength={1}
                value={value ? value : ''}
                ref={otpInputRef}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setActiveInputIndex(0)}
                onKeyDown={handleKeyDownEvent}
            />
        </>
    );
};

export default OTPInputField;