import { useState } from 'react';

import { errorMessages, OTP_LENGTH, routes } from 'src/constants';
import { otpService } from 'src/services';
import { isValidInput, isValidNumber } from 'src/utils';
import OTPInputField from '../form-elements/OtpInputField';

const emptyArray = [...Array(OTP_LENGTH)];

interface IOTPFormProps {
    setIsGeneratorVisible: (value: boolean) => void;
}

function OTPForm(props: IOTPFormProps) {
    const [activeInputIndex, setActiveInputIndex] = useState(1);

    const [defaultValues, setDefaultValues] = useState<Array<string>>([]);

    const [otp, setOtp] = useState<Array<string>>([...Array(OTP_LENGTH)]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formError, setFormError] = useState<string>('');

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pastedValue = e.clipboardData.getData('text/plain').trim();

        const isValid = isValidNumber(pastedValue);

        if (!isValid) {
            // setFormError(errorMessages.INVALID_OTP);
            alert('Invalid OTP');
            return;
        }

        const digitsArray = pastedValue.split('', OTP_LENGTH);

        let activeIndex = activeInputIndex - 1;
        let otpArray: Array<string> = [];

        digitsArray.forEach((digit) => {
            const fillFromIndex = activeIndex;
            const fillToIndex = activeInputIndex + digitsArray.length - 1;
            otpArray = emptyArray.fill(digit, fillFromIndex, fillToIndex);
            // console.log("=====HERE======", fillFromIndex, fillToIndex, activeInputIndex, emptyArray);
            activeIndex = activeIndex + 1;
        });
        // console.log(otpArray, "=====OTP_ARRAY=====")
        setDefaultValues(otpArray);
        setOtp(otpArray);
        setActiveInputIndex(activeIndex);
    };

    const checkIfValidOTP = (): boolean => {
        const otpString = otp.join('');
        const isValid = isValidInput(otpString);

        if (!isValid) {
            setFormError(errorMessages.INVALID_OTP);
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const isValid = checkIfValidOTP();
        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        try {
            await otpService.validateOTP(+otp.join(''));
            alert('Success');
            window.location.href = routes.SUCCESS;
        } catch (error) {
            alert(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='otp-verification-form'>
            <h2>Verification</h2>
            <form onSubmit={handleSubmit}>
                {emptyArray.map((_, index) => (
                    <OTPInputField
                        key={index}
                        index={index + 1}
                        activeInputIndex={activeInputIndex}
                        defaultValue={defaultValues[index]}
                        otp={otp}
                        isSubmitting={isSubmitting}
                        formError={formError}
                        setActiveInputIndex={setActiveInputIndex}
                        handleOnPaste={handleOnPaste}
                        setOtp={setOtp}
                    />
                ))}
                <div>
                    <button
                        className='btn-primary'
                        type='submit'
                        // disabled={!checkIfValidOTP()}
                        disabled={isSubmitting}
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
