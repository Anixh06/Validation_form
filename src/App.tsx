import React from 'react';
import { Registration } from './pages/Registration';
import { RegistrationSuccess } from './pages/RegistrationSuccess';

function App() {
  const isSuccessPage = window.location.pathname === '/success';

  return (
    <div className="min-h-screen bg-gray-50">
      {isSuccessPage ? <RegistrationSuccess /> : <Registration />}
    </div>
  );
}

export default App;