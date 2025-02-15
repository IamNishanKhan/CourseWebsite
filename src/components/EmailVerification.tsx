import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: () => void;
  onBack: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerificationComplete,
  onBack,
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Here you would typically make an API call to verify the code
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode.length !== 6) {
        throw new Error('Invalid verification code');
      }

      onVerificationComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification code to{' '}
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setVerificationCode(value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter 6-digit code"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 p-3 rounded-md"
          >
            {error}
          </motion.div>
        )}

        <div className="flex items-center justify-between space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || verificationCode.length !== 6}
            className={`flex items-center justify-center px-4 py-2 border border-transparent 
                     rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600
                     ${isLoading || verificationCode.length !== 6 
                       ? 'opacity-50 cursor-not-allowed' 
                       : 'hover:bg-indigo-700'}`}
          >
            {isLoading ? (
              'Verifying...'
            ) : (
              <>
                Verify Email
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </form>
    </motion.div>
  );
};