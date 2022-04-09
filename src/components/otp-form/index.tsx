import { useState } from 'react';
import { OTP_LENGTH } from 'src/constants';
import { otpService } from 'src/services';
import { isValidInput } from 'src/utils';
import OTPInputField from '../form-elements/OtpInputField';

const emptyArray = [...Array(OTP_LENGTH)];

interface IOTPFormProps {
    setIsGeneratorVisible: (value: boolean) => void;
}

function OTPForm(props: IOTPFormProps) {
    const [activeInputIndex, setActiveInputIndex] = useState(1);

    const [defaultValues, setDefaultValues] = useState<Array<string>>([]);

    const [otp, setOtp] = useState<Array<string>>([...Array(OTP_LENGTH)]);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pastedValue = e.clipboardData.getData('text/plain').trim();
        const isValid = isValidInput(pastedValue);

        if (!isValid) {
            return;
        }

        const digitsArray = pastedValue.split('', OTP_LENGTH);
        let activeIndex = activeInputIndex - 1;
        let otpArray: Array<string> = [];

        digitsArray.forEach((digit) => {
            const fillFromIndex = activeIndex;
            const fillToIndex = activeInputIndex + digitsArray.length - 1;
            otpArray = emptyArray.fill(digit, fillFromIndex, fillToIndex);
            activeIndex = activeIndex + 1;
        });
        setDefaultValues(otpArray);
        setOtp(otpArray);
        setActiveInputIndex(activeIndex);
    };

    const checkIfValidOTP = (): boolean => {
        return otp.every((digitString) =>
            digitString?.length === 0 ? false : !isNaN(+digitString)
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        const isValid = checkIfValidOTP();
        if (!isValid) {
            alert('Invalid OTP');
            return;
        }

        try {
            await otpService.validateOTP(+otp.join(''));
            alert('Success');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="otp-verification-form">
            <h2>Verification</h2>
            <form onSubmit={handleSubmit}>
                {emptyArray.map((_, index) => (
                    <OTPInputField
                        key={index}
                        index={index + 1}
                        activeInputIndex={activeInputIndex}
                        defaultValue={defaultValues[index]}
                        otp={otp}
                        isSubmitted={isSubmitted}
                        setActiveInputIndex={setActiveInputIndex}
                        handleOnPaste={handleOnPaste}
                        setOtp={setOtp}
                    />
                ))}
                <div>
                    <button
                        className="btn-primary"
                        type="submit"
                        // disabled={!checkIfValidOTP()}
                        style={{ marginRight: '10px' }}
                    >
                        Submit
                    </button>
                    <button
                        className="btn-primary"
                        type="button"
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
