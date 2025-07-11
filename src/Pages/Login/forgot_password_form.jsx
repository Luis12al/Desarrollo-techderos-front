import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Zap } from 'lucide-react';

const ForgotPasswordForm = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Forgot password attempt:', formData);
    // Aquí iría la lógica para enviar email de recuperación
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 opacity-30">
        <Zap className="text-gray-400" size={24} />
      </div>
      <div className="absolute top-20 right-20 opacity-30">
        <Zap className="text-gray-400" size={20} />
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        {/* Botón de regreso */}
        <button 
          onClick={() => onNavigate('login')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al login
        </button>

        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Lock className="text-blue-600" size={24} />
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-600 text-sm">
            No te preocupes, te enviaremos instrucciones para recuperarla
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {/* Campo de email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
          </div>

          {/* Botón de envío */}
          <button
            onClick={handleSubmit}
            style={{backgroundColor: '#007BFF'}}
            className="w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            Enviar instrucciones
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Mail className="text-blue-600 mr-2" size={16} />
            <p className="text-sm font-medium text-blue-800">
              Revisa tu correo electrónico
            </p>
          </div>
          <p className="text-xs text-blue-700">
            Te enviaremos un enlace para restablecer tu contraseña. 
            Si no lo encuentras, revisa tu carpeta de spam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;