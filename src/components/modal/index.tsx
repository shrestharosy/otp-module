import OTPGenerator from '../otp-generator';

interface IModalProps {
    setIsGeneratorVisible: (value: boolean) => void;
}

const Modal = (props: IModalProps) => {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <h3>Generate OTP</h3>
                <OTPGenerator />
                <button
                    className='btn-close'
                    onClick={() => props.setIsGeneratorVisible(false)}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default Modal;
