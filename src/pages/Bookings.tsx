
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRoutes, useSchedules } from '@/hooks/useTransitData';
import { useBookings, useCreateBooking } from '@/hooks/useBookings';
import { ArrowLeft, Clock, MapPin, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Bookings = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  
  const transitTypeId = searchParams.get('transit');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const { data: routes, isLoading: routesLoading } = useRoutes(transitTypeId || undefined, from || undefined, to || undefined);
  const { data: schedules, isLoading: schedulesLoading } = useSchedules(selectedRoute);
  const { data: bookings } = useBookings();
  const createBooking = useCreateBooking();

  const handleBookTicket = async (scheduleId: string, routeId: string) => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('pleaseLogin'),
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      await createBooking.mutateAsync({
        route_id: routeId,
        schedule_id: scheduleId,
        booking_date: new Date().toISOString().split('T')[0],
      });

      toast({
        title: t('success'),
        description: t('ticketBookedSuccessfully'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('bookingFailed'),
        variant: "destructive",
      });
    }
  };

  if (routesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-doroub-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-doroub-gradient px-6 pt-12 pb-6 rounded-b-3xl">
        <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className={`text-white hover:bg-white/20 ${isRTL ? 'ml-4' : 'mr-4'}`}
          >
            <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
          </Button>
          <h1 className="text-2xl font-bold text-white">
            {selectedRoute ? t('selectSchedule') : t('availableRoutes')}
          </h1>
        </div>
        {(from || to) && (
          <p className="text-white/80">
            {from && to ? `${from} → ${to}` : from || to}
          </p>
        )}
      </div>

      <div className="px-6 py-6">
        {!selectedRoute ? (
          // Routes List
          <div className="space-y-4">
            {routes && routes.length > 0 ? (
              routes.map((route) => (
                <Card key={route.id} className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedRoute(route.id)}>
                  <CardContent className="p-4">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${route.transit_types.color} rounded-xl flex items-center justify-center text-xl`}>
                          {route.transit_types.icon}
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <h3 className="font-bold text-gray-800">{route.name}</h3>
                          <div className={`flex items-center space-x-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <MapPin size={14} />
                            <span>{route.origin} → {route.destination}</span>
                          </div>
                          <div className={`flex items-center space-x-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Clock size={14} />
                            <span>{route.duration_minutes} {t('minutes')}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                        <p className="text-2xl font-bold text-doroub-blue">{route.price_da} DA</p>
                        <Badge variant="secondary">{route.transit_types.name}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">{t('noRoutesFound')}</p>
                <Button 
                  onClick={() => navigate('/home')} 
                  className="mt-4 bg-doroub-gradient text-white"
                >
                  {t('searchAgain')}
                </Button>
              </Card>
            )}
          </div>
        ) : (
          // Schedules List
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setSelectedRoute('')}
              className={`mb-4 ${isRTL ? 'float-right' : 'float-left'}`}
            >
              <ArrowLeft size={16} className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t('backToRoutes')}
            </Button>
            
            <div className="clear-both">
              {schedulesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-doroub-blue" />
                </div>
              ) : schedules && schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <Card key={schedule.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={isRTL ? 'text-right' : ''}>
                          <div className={`flex items-center space-x-2 mb-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Clock size={16} className="text-doroub-blue" />
                            <span className="font-semibold">
                              {schedule.departure_time} - {schedule.arrival_time}
                            </span>
                          </div>
                          <div className={`flex items-center space-x-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Users size={14} />
                            <span>{schedule.available_seats} {t('seatsAvailable')}</span>
                          </div>
                          <p className="text-xl font-bold text-doroub-blue mt-2">
                            {schedule.routes.price_da} DA
                          </p>
                        </div>
                        <Button
                          onClick={() => handleBookTicket(schedule.id, schedule.route_id)}
                          disabled={createBooking.isPending || schedule.available_seats === 0}
                          className="bg-doroub-gradient text-white hover:opacity-90 disabled:opacity-50"
                        >
                          {createBooking.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : schedule.available_seats === 0 ? (
                            t('fullyBooked')
                          ) : (
                            t('bookNow')
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-gray-500">{t('noSchedulesFound')}</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* My Current Bookings */}
        {bookings && bookings.length > 0 && (
          <div className="mt-8">
            <h3 className={`text-xl font-bold text-gray-800 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {t('myCurrentBookings')}
            </h3>
            <div className="space-y-3">
              {bookings.filter(b => b.status === 'active').map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-doroub-blue">
                  <CardContent className="p-4">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={isRTL ? 'text-right' : ''}>
                        <h4 className="font-semibold">{booking.routes.origin} → {booking.routes.destination}</h4>
                        <p className="text-sm text-gray-600">
                          {booking.routes.transit_types.name} • {booking.schedules.departure_time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t('bookedOn')}: {new Date(booking.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                        <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                          {t(booking.payment_status)}
                        </Badge>
                        <p className="text-lg font-bold text-doroub-blue mt-1">
                          {booking.routes.price_da} DA
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Bookings;
