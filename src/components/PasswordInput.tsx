import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor="password\" className="block text-sm font-medium text-gray-700">
        Password <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={value}
          onChange={onChange}
          className={`mt-2 block w-full rounded-md shadow-sm pr-10 h-9 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}