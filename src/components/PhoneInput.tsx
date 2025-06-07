import React from 'react';
import { countries } from '../data/countries';

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  error
}: PhoneInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 flex">
        <select
          name="countryCode"
          value={countryCode}
          onChange={onCountryCodeChange}
          className="rounded-l-md border-r-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.phoneCode}>
              {country.phoneCode}
            </option>
          ))}
        </select>
        <input
          type="tel"
          id="phone"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          className={`block w-full rounded-r-md h-9 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="1234567890"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}