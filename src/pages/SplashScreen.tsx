
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Auto-redirect if user is already authenticated
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-doroub-gradient flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-8 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
            دروب
          </h1>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">
            DOROUB
          </h2>
          <div className="w-20 h-1 bg-white mx-auto rounded-full opacity-80"></div>
        </div>

        {/* Tagline */}
        <p className="text-xl text-white/90 font-medium max-w-sm mx-auto leading-relaxed">
          {t('tagline')}
        </p>

        {/* Features showcase */}
        <div className="grid grid-cols-3 gap-6 my-12 max-w-sm mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up">
            <div className="w-12 h-12 bg-white/30 rounded-xl mx-auto mb-2 flex items-center justify-center">
              🚌
            </div>
            <p className="text-white/80 text-xs font-medium">ETUSB</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up delay-100">
            <div className="w-12 h-12 bg-white/30 rounded-xl mx-auto mb-2 flex items-center justify-center">
              🚍
            </div>
            <p className="text-white/80 text-xs font-medium">{t('bus')}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center animate-slide-up delay-200">
            <div className="w-12 h-12 bg-white/30 rounded-xl mx-auto mb-2 flex items-center justify-center">
              🚆
            </div>
            <p className="text-white/80 text-xs font-medium">{t('train')}</p>
          </div>
        </div>

        {/* CTA Button */}
        {!isAuthenticated && (
          <Button 
            onClick={() => navigate('/login')}
            className="bg-white text-doroub-blue hover:bg-white/90 font-semibold text-lg px-8 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            {t('getStarted')}
          </Button>
        )}

        {isAuthenticated && (
          <div className="text-white/90 text-lg animate-pulse">
            {t('welcome')}...
          </div>
        )}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default SplashScreen;
