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
        if (e.currentTarget.value.length > 1) return false;
        setValue(e.currentTarget.value)
        handleInputFocus()
    };

    const handleInputFocus = () => {

        setActiveInputIndex(index + 1);
    }

    const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keys = ['+', '-', 'e', 'E', '.'];
        console.log(e.key)
        if (keys.includes(e.key)) {
            e.preventDefault();
        }

        if (e.key === 'Backspace') {
            setValue('')
            setActiveInputIndex(index - 1);
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
                onBlur={() => setActiveInputIndex(0)}
                onKeyDown={handleKeyDownEvent}
            />
        </>
    );
};

export default OTPInputField;