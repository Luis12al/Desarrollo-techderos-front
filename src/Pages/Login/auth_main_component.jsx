import React, { useState } from 'react';
import LoginForm from './login_form.jsx';
import ForgotPasswordForm from './forgot_password_form.jsx';

const AuthMain = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot', 'register'

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === 'login' && <LoginForm onNavigate={handleNavigate} />}
      {currentView === 'forgot' && <ForgotPasswordForm onNavigate={handleNavigate} />}
    </>
  );
};

export default AuthMain;