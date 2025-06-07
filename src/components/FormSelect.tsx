import React from 'react';

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  id,
  value,
  onChange,
  options,
  error,
  required = false
}: FormSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`mt-2 block w-full rounded-md shadow-sm h-9 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}