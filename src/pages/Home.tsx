
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTransitTypes, useRoutes } from '@/hooks/useTransitData';
import { useBookings } from '@/hooks/useBookings';
import { Clock, MapPin, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    selectedTransit: ''
  });

  const { data: transitTypes, isLoading: transitLoading } = useTransitTypes();
  const { data: routes, isLoading: routesLoading } = useRoutes(
    searchData.selectedTransit,
    searchData.from,
    searchData.to
  );
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  const handleShowAvailableTickets = () => {
    if (!searchData.selectedTransit) {
      return;
    }
    
    const params = new URLSearchParams();
    if (searchData.from) params.set('from', searchData.from);
    if (searchData.to) params.set('to', searchData.to);
    if (searchData.selectedTransit) params.set('transit', searchData.selectedTransit);
    
    navigate(`/bookings?${params.toString()}`);
  };

  if (transitLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-doroub-blue" />
      </div>
    );
  }

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
                placeholder={t('origin')}
              />
            </div>
            <div>
              <Label className={`text-white/90 text-sm ${isRTL ? 'text-right' : ''}`}>{t('to')}</Label>
              <Input
                value={searchData.to}
                onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl mt-1 ${isRTL ? 'text-right' : ''}`}
                placeholder={t('destination')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transit Options */}
      <div className="px-6 py-6">
        <h3 className={`text-xl font-bold text-gray-800 mb-4 ${isRTL ? 'text-right' : ''}`}>
          {t('chooseTransport')}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {transitTypes?.map((option) => (
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
          disabled={!searchData.selectedTransit}
          className={`w-full bg-doroub-gradient hover:opacity-90 text-white font-semibold py-3 rounded-2xl mt-6 transition-all duration-300 hover:scale-105 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
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
        
        {bookingsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-doroub-blue" />
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center space-x-2 mb-1 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <span className="font-semibold text-gray-800">{booking.routes.origin}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-semibold text-gray-800">{booking.routes.destination}</span>
                      </div>
                      <div className={`flex items-center space-x-4 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <span>{booking.routes.transit_types.name}</span>
                        <span>{booking.schedules.departure_time}</span>
                        <span className="font-semibold text-doroub-blue">{booking.routes.price_da} DA</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {t(booking.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-500">{t('noTicketsYet')}</p>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
