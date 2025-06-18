
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Booking {
  id: string;
  user_id: string;
  route_id: string;
  schedule_id: string;
  booking_date: string;
  seat_number?: string;
  status: 'active' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  routes: {
    name: string;
    origin: string;
    destination: string;
    price_da: number;
    transit_types: {
      name: string;
      icon: string;
    };
  };
  schedules: {
    departure_time: string;
    arrival_time: string;
  };
}

export const useBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          routes (
            name,
            origin,
            destination,
            price_da,
            transit_types (
              name,
              icon
            )
          ),
          schedules (
            departure_time,
            arrival_time
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Booking[];
    },
    enabled: !!user,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (booking: {
      route_id: string;
      schedule_id: string;
      booking_date: string;
      seat_number?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          ...booking,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
