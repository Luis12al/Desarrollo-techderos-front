import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, Store, Zap, HelpCircle, X, ChevronRight, ChevronLeft } from 'lucide-react';

const LoginForm = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [arrowDirection, setArrowDirection] = useState('bottom');

  // Referencias para los elementos
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const showPasswordRef = useRef(null);
  const rememberRef = useRef(null);
  const forgotRef = useRef(null);
  const loginRef = useRef(null);

  const guideSteps = [
    {
      id: 'email',
      title: 'Paso 1: Ingresa tu correo electrónico',
      content: 'Escribe aquí el correo electrónico que usaste para registrarte. Asegúrate de que esté escrito correctamente.',
      ref: emailRef,
      offset: { x: 0, y: 20 }
    },
    {
      id: 'password',
      title: 'Paso 2: Ingresa tu contraseña',
      content: 'Escribe tu contraseña secreta. Recuerda que es sensible a mayúsculas y minúsculas.',
      ref: passwordRef,
      offset: { x: 0, y: 20 }
    },
    {
      id: 'show-password',
      title: 'Consejo: Verificar tu contraseña',
      content: 'Puedes hacer clic en el ícono del ojo para mostrar u ocultar tu contraseña mientras la escribes.',
      ref: showPasswordRef,
      offset: { x: -320, y: 0 }
    },
    {
      id: 'remember-me',
      title: 'Opción: Recordar sesión',
      content: 'Marca esta casilla si quieres que el sistema recuerde tu sesión. No lo hagas en computadoras públicas.',
      ref: rememberRef,
      offset: { x: 0, y: -270 }
    },
    {
      id: 'forgot-password',
      title: 'Si olvidaste tu contraseña',
      content: 'Haz clic aquí si no recuerdas tu contraseña. Te enviaremos un enlace de recuperación a tu correo.',
      ref: forgotRef,
      offset: { x: -0, y: -270 }
    },
    {
      id: 'login-button',
      title: 'Paso 3: Ingresar a tu tienda',
      content: 'Una vez completados los campos anteriores, haz clic aquí para acceder a tu tienda digital.',
      ref: loginRef,
      offset: { x: 0, y: -250 }
    }
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Login attempt:', formData);
    // Aquí iría la lógica de autenticación
  };

  const calculatePopupPosition = (step) => {
    if (!step.ref.current) return { top: 0, left: 0 };

    const element = step.ref.current;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const elementTop = rect.top + scrollTop;
    const elementLeft = rect.left + scrollLeft;
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    let top = elementTop + elementHeight + step.offset.y;
    let left = elementLeft + (elementWidth / 2) + step.offset.x;

    // Ajustar dirección de la flecha según la posición
    if (step.offset.y < 0) {
      setArrowDirection('bottom');
      top = elementTop + step.offset.y;
    } else if (step.offset.x < 0) {
      setArrowDirection('right');
      left = elementLeft + step.offset.x;
      top = elementTop + (elementHeight / 2) - 100;
    } else {
      setArrowDirection('top');
    }

    return { top, left };
  };

  const startGuide = () => {
    setShowGuide(true);
    setCurrentStep(0);
  };

  const closeGuide = () => {
    setShowGuide(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeGuide();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Actualizar posición del popup cuando cambia el paso
  useEffect(() => {
    if (showGuide && guideSteps[currentStep]) {
      setTimeout(() => {
        const position = calculatePopupPosition(guideSteps[currentStep]);
        setPopupPosition(position);
      }, 100);
    }
  }, [currentStep, showGuide]);

  const currentGuideStep = guideSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007BFF] via-[#007BFF] to-[#FF6F00] flex items-center justify-center p-4">
      
      {/* Overlay cuando está activa la guía */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/10 z-40"></div>
      )}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#7ED957]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#FF6F00]/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 z-30">
        
        {/* Botón de ayuda */}
        <button
          onClick={startGuide}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#7ED957] text-white shadow-lg hover:bg-[#7ED957]/90 transition-all duration-300 hover:scale-110 z-10"
          title="Iniciar guía paso a paso"
        >
          <HelpCircle size={20} />
        </button>
        
        <div className="flex justify-center items-center mb-6 relative">
          <div className="absolute -top-2 -left-2 text-[#7ED957] animate-bounce">
            <Zap size={20} />
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-[#007BFF] to-[#FF6F00] rounded-2xl flex items-center justify-center shadow-lg">
            <Store className="text-white" size={32} />
          </div>
          <div className="absolute -bottom-2 -right-2 text-[#FF6F00] animate-bounce delay-300">
            <Zap size={16} />
          </div>
        </div>

        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#007BFF] to-[#FF6F00] bg-clip-text text-transparent mb-2">
            TECH_DEROS
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Transformando tenderos en
          </p>
          <p className="text-[#7ED957] text-sm font-bold">
            micropymes tecnológicas ✨
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          
          <div 
            ref={emailRef}
            className={`transition-all duration-500 ${
              showGuide && currentGuideStep?.id === 'email' 
                ? 'relative z-50 ring-4 ring-[#7ED957] ring-opacity-75 rounded-xl shadow-lg' 
                : ''
            }`}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all duration-300 bg-gray-50 font-medium"
                placeholder="dero@ejemplo.com"
              />
            </div>
          </div>

          
          <div 
            ref={passwordRef}
            className={`transition-all duration-500 ${
              showGuide && currentGuideStep?.id === 'password' 
                ? 'relative z-50 ring-4 ring-[#7ED957] ring-opacity-75 rounded-xl shadow-lg' 
                : ''
            }`}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all duration-300 bg-gray-50 font-medium"
                placeholder="••••••••"
              />
              <button
                ref={showPasswordRef}
                type="button"
                onClick={togglePasswordVisibility}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-500 ${
                  showGuide && currentGuideStep?.id === 'show-password' 
                    ? 'z-50 ring-4 ring-[#7ED957] ring-opacity-75 rounded-full p-2 bg-white shadow-lg' 
                    : ''
                }`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          
          <div className="flex items-center justify-between text-sm">
            <label 
              ref={rememberRef}
              className={`flex items-center text-gray-600 transition-all duration-500 ${
                showGuide && currentGuideStep?.id === 'remember-me' 
                  ? 'relative z-50 ring-4 ring-[#7ED957] ring-opacity-75 rounded-lg p-2 bg-white shadow-lg' 
                  : ''
              }`}
            >
              <input 
                type="checkbox" 
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="mr-2 w-4 h-4 text-[#007BFF] rounded focus:ring-[#007BFF]"
              />
              <span>Recordarme</span>
            </label>
            
            <button 
              ref={forgotRef}
              onClick={() => onNavigate && onNavigate('forgot')}
              className={`text-[#007BFF] hover:text-[#FF6F00] transition-all duration-500 font-medium ${
                showGuide && currentGuideStep?.id === 'forgot-password' 
                  ? 'relative z-50 ring-4 ring-[#7ED957] ring-opacity-75 rounded-lg p-2 bg-white shadow-lg' 
                  : ''
              }`}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          
          <button
            ref={loginRef}
            onClick={handleSubmit}
            className={`w-full bg-gradient-to-r from-[#FF6F00] to-[#FF6F00]/90 hover:from-[#FF6F00]/90 hover:to-[#FF6F00] text-white font-bold py-3 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
              showGuide && currentGuideStep?.id === 'login-button' 
                ? 'relative z-50 ring-4 ring-[#7ED957] ring-opacity-75 shadow-2xl' 
                : ''
            }`}
          >
            Ingresar a mi tienda digital
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Al ingresar aceptas nuestros{' '}
            <button className="text-[#007BFF] hover:text-[#FF6F00] transition-colors">
              términos y condiciones
            </button>
          </p>
        </div>
      </div>

      {/* Popup flotante que se mueve */}
      {showGuide && currentGuideStep && (
        <div 
          className="fixed z-50 transition-all duration-700 ease-out"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#7ED957] max-w-sm w-80 transform transition-all duration-300 animate-pulse">
            
            {/* Flecha indicadora */}
            <div className={`absolute w-0 h-0 ${
              arrowDirection === 'top' ? '-top-3 left-1/2 transform -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-[12px] border-transparent border-b-[#7ED957]' :
              arrowDirection === 'bottom' ? '-bottom-3 left-1/2 transform -translate-x-1/2 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-[#7ED957]' :
              arrowDirection === 'right' ? '-right-3 top-1/2 transform -translate-y-1/2 border-t-[12px] border-b-[12px] border-l-[12px] border-transparent border-l-[#7ED957]' :
              '-left-3 top-1/2 transform -translate-y-1/2 border-t-[12px] border-b-[12px] border-r-[12px] border-transparent border-r-[#7ED957]'
            }`}></div>

            {/* Header del popup */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#007BFF]/10 to-[#7ED957]/10 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#007BFF] to-[#7ED957] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{currentStep + 1}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {currentStep + 1} de {guideSteps.length}
                </span>
              </div>
              <button
                onClick={closeGuide}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del popup */}
            <div className="p-4">
              <h3 className="text-base font-bold text-[#007BFF] mb-2">
                {currentGuideStep.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {currentGuideStep.content}
              </p>

              {/* Botones de navegación */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                    currentStep === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-[#007BFF] hover:bg-[#007BFF]/10'
                  }`}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>

                <button
                  onClick={nextStep}
                  className="flex items-center gap-1 px-4 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#007BFF]/90 transition-all duration-300 text-sm"
                >
                  {currentStep === guideSteps.length - 1 ? '¡Listo!' : 'Siguiente'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;