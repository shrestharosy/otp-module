import { useEffect, useRef } from "react";
import { OTP_LENGTH } from "src/constants";

interface IOTPInputFieldProps {
    index: number
    activeInputIndex: number
    setActiveInputIndex: (index: number) => void
}

const OTPInputField = (props: IOTPInputFieldProps) => {
    const { index, activeInputIndex, setActiveInputIndex } = props

    const otpInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (activeInputIndex === index) {
            otpInputRef?.current?.focus();
        }
    }, [activeInputIndex, index]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO : get form values
        handleInputFocus()
    };

    const handleInputFocus = () => {
        if (activeInputIndex === OTP_LENGTH) {
            setActiveInputIndex(0)
        }
        else {
            setActiveInputIndex(index + 1);
        }
    }

    return (
        <>
            <input
                name={`otp-${index}`}
                type="tel"
                maxLength={1}
                ref={otpInputRef}
                onChange={(e) => handleInputChange(e)}
                autoFocus={false}
                onBlur={() => setActiveInputIndex(0)}
            />
        </>
    );
};

export default OTPInputField;
