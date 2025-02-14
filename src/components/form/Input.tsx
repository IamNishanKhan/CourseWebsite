import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  id: string;
  type: 'text' | 'email' | 'password' | 'tel';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  type: initialType,
  label,
  value,
  onChange,
  placeholder,
  icon,
  required = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone number validation for Bangladesh (11 digits)
  const phoneRegex = /^\d{11}$/;
  
  const validateInput = (value: string) => {
    if (initialType === 'email' && value && !emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    if (initialType === 'tel' && value && !phoneRegex.test(value)) {
      return 'Please enter a valid 11-digit phone number';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (initialType === 'tel') {
      newValue = newValue.replace(/\D/g, '').slice(0, 11);
    }
    
    // Validate input and set error
    const validationResult = validateInput(newValue);
    setValidationError(validationResult);
    
    onChange(newValue);
  };

  const type = initialType === 'password' 
    ? (showPassword ? 'text' : 'password')
    : initialType;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <div className="relative">
          {initialType === 'tel' && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              +88
            </span>
          )}
          <input
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            className={`block w-full ${icon ? 'pl-10' : ''} 
                     ${initialType === 'tel' ? 'pl-12' : ''}
                     pr-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                     ${error ? 'border-red-500' : ''}`}
            placeholder={placeholder}
            required={required}
          />
          {initialType === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>
      {(error || validationError) && (
        <p className="mt-1 text-sm text-red-600">{error || validationError}</p>
      )}
    </div>
  );
};