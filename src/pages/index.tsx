import { useState } from 'react';
import Modal from 'src/components/modal';
import OTPForm from 'src/components/otp-form';

function Home() {
    const [isGeneratorVisible, setIsGeneratorVisible] = useState(false);

    return (
        <>
            <OTPForm setIsGeneratorVisible={setIsGeneratorVisible} />
            {isGeneratorVisible && (
                <Modal setIsGeneratorVisible={setIsGeneratorVisible} />
            )}
        </>
    );
}

export default Home;
