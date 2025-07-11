import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, User, Phone, Zap } from 'lucide-react';

const RegisterForm = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Register attempt:', formData);
    // Aquí iría la lógica de registro
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
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <User className="text-green-600" size={24} />
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Crear cuenta gratuita
          </h1>
          <p className="text-gray-600 text-sm">
            Únete a TECH_DEROS y transforma tu negocio
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-5">
          {/* Campo de nombre */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu nombre completo"
              />
            </div>
          </div>

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
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          {/* Campo de teléfono */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="300 123 4567"
              />
            </div>
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Campo de confirmar contraseña */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirma tu contraseña"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Botón de registro */}
          <button
            onClick={handleSubmit}
            style={{backgroundColor: '#7ED957'}}
            className="w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            Crear mi cuenta gratuita
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Al crear una cuenta aceptas nuestros{' '}
            <button className="text-blue-600 hover:text-blue-800 underline">
              términos y condiciones
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;