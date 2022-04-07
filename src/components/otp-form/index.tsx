import { useState } from 'react';
import { OTP_LENGTH } from 'src/constants';
import OTPInputField from '../form-elements/OtpInputField';

const emptyArray = [...Array(OTP_LENGTH)];

function OTPForm() {
    const [activeInputIndex, setActiveInputIndex] = useState(1);

    const [defaultValues, setDefaultValues] = useState<Array<string>>([]);

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedValue = e.clipboardData.getData('text/plain').trim();
        const isValid = isValidInput(pastedValue);

        if (!isValid) {
            return;
        }

        const digitsArray = pastedValue.split('', OTP_LENGTH);
        let activeIndex = activeInputIndex - 1;
        digitsArray.forEach((digit) => {
            emptyArray.fill(
                digit,
                activeIndex,
                activeInputIndex + digitsArray.length - 1
            );
            activeIndex = activeIndex + 1;
        });
        setDefaultValues(emptyArray);
        setActiveInputIndex(activeIndex);
    };

    const isValidInput = (inputValue: string) => {
        if (isNaN(+inputValue)) {
            alert('Not a number');
            return false;
        }

        if (inputValue.length === 0) {
            return false;
        }

        return true;
    };

    return (
        <>
            <h2>Verification</h2>
            <form>
                {emptyArray.map((_, index) => (
                    <OTPInputField
                        key={index}
                        index={index + 1}
                        activeInputIndex={activeInputIndex}
                        defaultValue={defaultValues[index]}
                        setActiveInputIndex={setActiveInputIndex}
                        handleOnPaste={handleOnPaste}
                    />
                ))}
            </form>
        </>
    );
}

export default OTPForm;
