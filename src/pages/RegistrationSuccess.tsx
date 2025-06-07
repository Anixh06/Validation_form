import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface RegistrationData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
  city: string;
  panNumber: string;
  aadharNumber: string;
}

export function RegistrationSuccess() {
  const [data, setData] = useState<RegistrationData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900">No registration data found</h2>
          <p className="mt-2 text-gray-600">Please complete the registration form first.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-12 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-white" />
            <h2 className="mt-4 text-3xl font-bold text-white">Registration Successful!</h2>
            <p className="mt-2 text-emerald-100">Thank you for registering with us.</p>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="mt-1 text-lg text-gray-900">{`${data.firstName} ${data.lastName}`}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-lg text-gray-900">{data.username}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-lg text-gray-900">{data.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd className="mt-1 text-lg text-gray-900">{`${data.countryCode} ${data.phoneNumber}`}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-lg text-gray-900">{`${data.city}, ${data.country}`}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">PAN Number</dt>
                    <dd className="mt-1 text-lg text-gray-900">{data.panNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Aadhar Number</dt>
                    <dd className="mt-1 text-lg text-gray-900">{data.aadharNumber}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Register Another Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}