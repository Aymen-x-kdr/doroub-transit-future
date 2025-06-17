
import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, QrCode } from 'lucide-react';

const Bookings = () => {
  const { t } = useLanguage();

  const bookings = [
    {
      id: 1,
      from: 'University Campus',
      to: 'City Center Mall',
      date: '2024-06-17',
      time: '14:30',
      type: 'ETUSB',
      price: '120 DA',
      status: 'active',
      seat: 'A12',
      qrCode: 'QR123456'
    },
    {
      id: 2,
      from: 'Batna Railway Station',
      to: 'Constantine Central',
      date: '2024-06-18',
      time: '09:15',
      type: 'Train',
      price: '800 DA',
      status: 'upcoming',
      seat: 'C24',
      qrCode: 'QR789012'
    },
    {
      id: 3,
      from: 'Airport Terminal',
      to: 'Hotel District',
      date: '2024-06-15',
      time: '16:45',
      type: 'Bus',
      price: '200 DA',
      status: 'completed',
      seat: 'B08',
      qrCode: 'QR345678'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'ETUSB': return '🚌';
      case 'Bus': return '🚍';
      case 'Train': return '🚆';
      default: return '🚌';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-doroub-gradient px-6 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white mb-2">{t('bookings')}</h1>
        <p className="text-white/80">Manage your travel tickets</p>
      </div>

      {/* Bookings List */}
      <div className="px-6 py-6 space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTransportIcon(booking.type)}</span>
                  <span className="font-semibold text-gray-800">{booking.type}</span>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>

              {/* Route */}
              <div className="flex items-center space-x-2 mb-3">
                <MapPin size={16} className="text-gray-500" />
                <span className="font-medium text-gray-800">{booking.from}</span>
                <span className="text-gray-400">→</span>
                <span className="font-medium text-gray-800">{booking.to}</span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Date & Time</p>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} className="text-gray-400" />
                    <span className="font-medium">{booking.date} • {booking.time}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-bold text-doroub-blue">{booking.price}</p>
                </div>
                <div>
                  <p className="text-gray-500">Seat</p>
                  <p className="font-medium">{booking.seat}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ticket ID</p>
                  <p className="font-mono text-xs">{booking.qrCode}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {booking.status === 'active' && (
                  <>
                    <Button className="flex-1 bg-doroub-gradient hover:opacity-90 text-white">
                      <QrCode size={16} className="mr-2" />
                      Show QR Code
                    </Button>
                    <Button variant="outline" className="flex-1 border-doroub-blue text-doroub-blue hover:bg-doroub-blue hover:text-white">
                      {t('trackTicket')}
                    </Button>
                  </>
                )}
                {booking.status === 'upcoming' && (
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View Details
                  </Button>
                )}
                {booking.status === 'completed' && (
                  <Button variant="outline" className="w-full">
                    Download Receipt
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no bookings) */}
      {bookings.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Clock className="text-gray-400" size={32} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-4">Start your journey by booking your first ticket</p>
          <Button className="bg-doroub-gradient hover:opacity-90 text-white">
            Book Now
          </Button>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Bookings;
