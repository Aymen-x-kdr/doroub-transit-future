
import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Globe, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const settingsItems = [
    {
      icon: User,
      title: t('profile'),
      description: t('manageAccount'),
      action: () => console.log('Profile clicked')
    },
    {
      icon: Bell,
      title: t('notifications'),
      description: t('controlNotifications'),
      action: () => console.log('Notifications clicked')
    },
    {
      icon: HelpCircle,
      title: t('support'),
      description: t('getHelpSupport'),
      action: () => console.log('Support clicked')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-doroub-gradient px-6 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white mb-2">{t('settings')}</h1>
        <p className="text-white/80">{t('customizeExperience')}</p>
      </div>

      {/* User Profile Card */}
      <div className="px-6 py-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
              <div className="w-16 h-16 bg-doroub-gradient rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{user?.name}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-doroub-blue">{t('premiumMember')}</p>
              </div>
              <ChevronRight className={`text-gray-400 ${isRTL ? 'rotate-180' : ''}`} size={20} />
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t('language')}</h4>
                  <p className="text-gray-600 text-sm">{t('chooseLanguage')}</p>
                </div>
              </div>
              <Select value={language} onValueChange={(value: 'en' | 'ar' | 'fr') => setLanguage(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Settings Items */}
        <div className="space-y-3">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={item.action}>
                <CardContent className="p-4">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-purple-100' :
                      index === 1 ? 'bg-green-100' :
                      'bg-orange-100'
                    }`}>
                      <Icon className={`${
                        index === 0 ? 'text-purple-600' :
                        index === 1 ? 'text-green-600' :
                        'text-orange-600'
                      }`} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                    <ChevronRight className={`text-gray-400 ${isRTL ? 'rotate-180' : ''}`} size={20} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* App Info */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-bold text-2xl text-gray-800 mb-1">دروب DOROUB</h3>
              <p className="text-gray-600 mb-2">{t('tagline')}</p>
              <p className="text-sm text-gray-500">{t('version')} 1.0.0</p>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="destructive" 
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
        >
          <LogOut className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={20} />
          {t('logout')}
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
