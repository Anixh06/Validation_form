import React, { useState, useEffect } from 'react';
import { FormInput } from '../components/FormInput';
import { PasswordInput } from '../components/PasswordInput';
import { PhoneInput } from '../components/PhoneInput';
import { FormSelect } from '../components/FormSelect';
import { countries } from '../data/countries';
import { validateEmail, validatePhone, validatePan, validateAadhar } from '../utils/validation';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
  city: string;
  panNumber: string;
  aadharNumber: string;
}

interface FormErrors {
  [key: string]: string;
}

export function Registration() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.name === formData.country);
      setAvailableCities(selectedCountry?.cities || []);
      if (!selectedCountry?.cities.includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    }
  }, [formData.country]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!validatePhone(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    else if (!validatePan(formData.panNumber)) newErrors.panNumber = 'Invalid PAN number format';
    if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
    else if (!validateAadhar(formData.aadharNumber)) newErrors.aadharNumber = 'Invalid Aadhar number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('registrationData', JSON.stringify(formData));
      window.location.href = '/success';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
            <p className="mt-2 text-blue-100">Please fill in all the required information below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              <div className="bg-gray-300 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="First Name"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                    placeholder="Enter your first name"
                  />
                  <FormInput
                    label="Last Name"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="bg-gray-300 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
                <div className="space-y-6">
                  <FormInput
                    label="Username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    required
                    placeholder="Choose a username"
                  />
                  <FormInput
                    label="Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="Enter your email address"
                  />
                  <PasswordInput
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                </div>
              </div>

              <div className="bg-gray-300 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-6">
                  <PhoneInput
                    countryCode={formData.countryCode}
                    phoneNumber={formData.phoneNumber}
                    onCountryCodeChange={handleChange}
                    onPhoneNumberChange={handleChange}
                    error={errors.phoneNumber}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect
                      label="Country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      options={countries.map(c => c.name)}
                      error={errors.country}
                      required
                    />
                    <FormSelect
                      label="City"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      options={availableCities}
                      error={errors.city}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-300 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="PAN Number"
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    error={errors.panNumber}
                    required
                    placeholder="Enter your PAN number"
                  />
                  <FormInput
                    label="Aadhar Number"
                    id="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    error={errors.aadharNumber}
                    required
                    placeholder="Enter your Aadhar number"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-medium text-lg"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}