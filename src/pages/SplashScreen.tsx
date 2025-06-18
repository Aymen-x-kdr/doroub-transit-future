
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative">
      {/* Main content */}
      <div className="text-center space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          {/* Purple rounded square icon with Arabic د */}
          <div className="w-16 h-16 bg-doroub-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">د</span>
          </div>
          
          {/* App name in Arabic */}
          <h1 className="text-2xl font-bold text-doroub-purple mb-1">
            دروب
          </h1>
          
          {/* Tagline in Arabic */}
          <p className="text-sm text-gray-600 font-medium">
            مستقبل النقل العام
          </p>
        </div>

        {/* CTA Button */}
        {!isAuthenticated && (
          <Button 
            onClick={() => navigate('/login')}
            className="bg-doroub-blue hover:bg-doroub-blue/90 text-white font-semibold text-lg px-8 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 mt-12"
          >
            {t('getStarted')}
          </Button>
        )}

        {isAuthenticated && (
          <div className="text-doroub-purple text-lg animate-pulse mt-12">
            {t('welcome')}...
          </div>
        )}
      </div>

      {/* Bottom indicator line */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
