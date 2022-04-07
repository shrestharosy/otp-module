import { useEffect, useState } from 'react';

const OTPGenerator = () => {
    const [otp, setOTP] = useState<number>();
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        generateOTP();
    }, []);

    const generateOTP = () => {
        const min = 100000;
        const max = 900000;
        const otp = Math.floor(min + Math.random() * max);
        setOTP(otp);
        setIsCopied(false);
    };

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(otp?.toString() ?? '');
        setIsCopied(true);
    };

    return (
        <div>
            {
                <div style={{ height: '12px', fontSize: '12px' }}>
                    {isCopied && 'Copied!'}
                </div>
            }
            <input
                type='number'
                value={otp}
                style={{ cursor: 'pointer' }}
                onChange={(e) => setOTP(+e.currentTarget.value)}
                onClick={handleCopyToClipboard}
            />
            <button
                className='btn-secondary'
                onClick={handleCopyToClipboard}
                disabled={!otp}
            >
                Copy To Clipboard
            </button>
            <button
                className='btn-primary'
                style={{ fontSize: '10px', letterSpacing: '1px' }}
                onClick={generateOTP}
            >
                Generate
            </button>
        </div>
    );
};

export default OTPGenerator;
