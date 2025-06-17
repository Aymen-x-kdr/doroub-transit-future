
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Book, Settings, Inbox } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/map', icon: Map, label: t('map') },
    { path: '/bookings', icon: Book, label: t('bookings') },
    { path: '/home', icon: Home, label: t('home'), isCenter: true },
    { path: '/settings', icon: Settings, label: t('settings') },
    { path: '/inbox', icon: Inbox, label: t('inbox') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/20 px-4 py-2 safe-bottom">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
                item.isCenter
                  ? active
                    ? 'bg-doroub-gradient text-white shadow-lg scale-110'
                    : 'bg-doroub-gradient text-white shadow-md'
                  : active
                  ? 'text-doroub-blue scale-105'
                  : 'text-gray-500'
              }`}
            >
              <Icon 
                size={item.isCenter ? 24 : 20} 
                className={`${active && !item.isCenter ? 'text-doroub-blue' : ''}`}
              />
              <span className={`text-xs font-medium ${
                item.isCenter ? 'text-white' : active ? 'text-doroub-blue' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
