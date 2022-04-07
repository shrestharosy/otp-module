import { useState } from 'react';
import './App.css';
import Modal from './components/modal';
import OTPForm from './components/otp-form';

function App() {
    const [isGeneratorVisible, setIsGeneratorVisible] = useState(false);

    return (
        <div className='App'>
            <OTPForm setIsGeneratorVisible={setIsGeneratorVisible} />
            {isGeneratorVisible && (
                <Modal setIsGeneratorVisible={setIsGeneratorVisible} />
            )}
        </div>
    );
}

export default App;
