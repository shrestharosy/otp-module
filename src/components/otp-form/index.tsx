import { useState } from "react";
import { OTP_LENGTH } from "src/constants";
import OTPInputField from "../form-elements/OtpInputField";

const emptyArray = [...Array(OTP_LENGTH)];

function OTPForm() {
    const [activeInputIndex, setActiveInputIndex] = useState(1);
    return (
        <>
            <h2>Verification</h2>
            <form>
                {
                    emptyArray.map((_, index) =>
                    (
                        <OTPInputField key={index} index={index + 1} activeInputIndex={activeInputIndex} setActiveInputIndex={setActiveInputIndex} />
                    ))
                }
            </form>
        </>
    );
}

export default OTPForm;
