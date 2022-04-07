import { useState } from 'react';
import { OTP_LENGTH } from 'src/constants';
import OTPInputField from '../form-elements/OtpInputField';

const emptyArray = [...Array(OTP_LENGTH)];

interface IOTPFormProps {
    setIsGeneratorVisible: (value: boolean) => void;
}

function OTPForm(props: IOTPFormProps) {
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
            const fillFromIndex = activeIndex;
            const fillToIndex = activeInputIndex + digitsArray.length - 1;
            emptyArray.fill(digit, fillFromIndex, fillToIndex);
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
        <div className='otp-verification-form'>
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
                <div>
                    <button
                        className='btn-primary'
                        type='submit'
                        style={{ marginRight: '10px' }}
                    >
                        Submit
                    </button>
                    <button
                        className='btn-primary'
                        type='button'
                        onClick={() => props.setIsGeneratorVisible(true)}
                        style={{ backgroundColor: 'white', color: 'black' }}
                    >
                        Generate code
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OTPForm;
