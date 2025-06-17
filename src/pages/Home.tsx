
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, MapPin, Search } from 'lucide-react';

const Home = () => {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    selectedTransit: 'etusb'
  });

  const transitOptions = [
    { 
      id: 'etusb', 
      name: t('etusb'), 
      icon: '🚌', 
      color: 'from-blue-500 to-blue-600',
      description: 'University Transport'
    },
    { 
      id: 'bus', 
      name: t('bus'), 
      icon: '🚍', 
      color: 'from-green-500 to-green-600',
      description: 'City Buses'
    },
    { 
      id: 'train', 
      name: t('train'), 
      icon: '🚆', 
      color: 'from-purple-500 to-purple-600',
      description: 'Railway Service'
    },
  ];

  const mockTickets = [
    {
      id: 1,
      from: 'University',
      to: 'City Center',
      time: '14:30',
      price: '120 DA',
      type: 'ETUSB',
      status: 'active'
    },
    {
      id: 2,
      from: 'Batna Station',
      to: 'Constantine',
      time: '16:45',
      price: '800 DA',
      type: 'Train',
      status: 'upcoming'
    }
  ];

  const handleShowAvailableTickets = () => {
    console.log('Showing available tickets for:', searchData);
    // Here you would typically make an API call to fetch available tickets
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-doroub-gradient px-6 pt-12 pb-8 rounded-b-3xl">
        <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : ''}>
            <h1 className="text-2xl font-bold text-white">
              {t('welcome')}, {user?.name || 'User'}
            </h1>
            <p className="text-white/80">{t('tagline')}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👋</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
          <h2 className={`text-white font-semibold mb-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MapPin className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={20} />
            {t('searchTickets')}
          </h2>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label className={`text-white/90 text-sm ${isRTL ? 'text-right' : ''}`}>{t('from')}</Label>
              <Input
                value={searchData.from}
                onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl mt-1 ${isRTL ? 'text-right' : ''}`}
                placeholder="Origin"
              />
            </div>
            <div>
              <Label className={`text-white/90 text-sm ${isRTL ? 'text-right' : ''}`}>{t('to')}</Label>
              <Input
                value={searchData.to}
                onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl mt-1 ${isRTL ? 'text-right' : ''}`}
                placeholder="Destination"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transit Options */}
      <div className="px-6 py-6">
        <h3 className={`text-xl font-bold text-gray-800 mb-4 ${isRTL ? 'text-right' : ''}`}>Choose Transport</h3>
        <div className="grid grid-cols-1 gap-4">
          {transitOptions.map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                searchData.selectedTransit === option.id 
                  ? 'ring-2 ring-doroub-blue shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSearchData({...searchData, selectedTransit: option.id})}
            >
              <CardContent className="p-4">
                <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center text-2xl`}>
                    {option.icon}
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <h4 className="font-bold text-lg text-gray-800">{option.name}</h4>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    searchData.selectedTransit === option.id 
                      ? 'border-doroub-blue bg-doroub-blue' 
                      : 'border-gray-300'
                  }`}>
                    {searchData.selectedTransit === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          onClick={handleShowAvailableTickets}
          className={`w-full bg-doroub-gradient hover:opacity-90 text-white font-semibold py-3 rounded-2xl mt-6 transition-all duration-300 hover:scale-105 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Search className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={20} />
          {t('showAvailableTickets')}
        </Button>
      </div>

      {/* My Tickets Section */}
      <div className="px-6 pb-6">
        <h3 className={`text-xl font-bold text-gray-800 mb-4 flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Clock className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('myTickets')}
        </h3>
        <div className="space-y-3">
          {mockTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center space-x-2 mb-1 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className="font-semibold text-gray-800">{ticket.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-semibold text-gray-800">{ticket.to}</span>
                    </div>
                    <div className={`flex items-center space-x-4 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span>{ticket.type}</span>
                      <span>{ticket.time}</span>
                      <span className="font-semibold text-doroub-blue">{ticket.price}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ticket.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
