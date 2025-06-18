
import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, Clock } from 'lucide-react';

const Map = () => {
  const { t, isRTL } = useLanguage();

  // Mock data for nearby stops
  const nearbyStops = [
    { id: 1, name: 'University Stop', type: 'ETUSB', distance: '0.2 km', nextArrival: '5 min' },
    { id: 2, name: 'City Center', type: 'Bus', distance: '0.8 km', nextArrival: '12 min' },
    { id: 3, name: 'Railway Station', type: 'Train', distance: '2.1 km', nextArrival: '25 min' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-doroub-gradient px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{t('map')}</h1>
          <Button className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30">
            <Navigation size={20} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('myLocation')}
          </Button>
        </div>
        <p className="text-white/80">{t('exploreTransit')}</p>
      </div>

      {/* Map Placeholder */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 relative">
          {/* Map simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-doroub-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{t('interactiveMap')}</h3>
              <p className="text-gray-600 text-sm">{t('realTimeMap')}</p>
            </div>
          </div>

          {/* Mock location markers */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-12 right-8 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute bottom-8 left-12 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute bottom-16 right-16 w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>

      {/* Nearby Stops */}
      <div className="px-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Clock className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('nearbyStops')}
        </h3>
        <div className="space-y-3">
          {nearbyStops.map((stop) => (
            <div key={stop.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stop.type === 'ETUSB' ? 'bg-blue-100 text-blue-600' :
                    stop.type === 'Bus' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {stop.type === 'ETUSB' ? '🚌' : stop.type === 'Bus' ? '🚍' : '🚆'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{stop.name}</h4>
                    <p className="text-gray-600 text-sm">{stop.type} • {stop.distance}</p>
                  </div>
                </div>
                <div className={`${isRTL ? 'text-left' : 'text-right'}`}>
                  <p className="font-semibold text-doroub-blue">{stop.nextArrival}</p>
                  <p className="text-gray-500 text-xs">{t('nextArrival')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Map;
