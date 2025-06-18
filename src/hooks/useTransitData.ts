
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TransitType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Route {
  id: string;
  transit_type_id: string;
  name: string;
  origin: string;
  destination: string;
  duration_minutes: number;
  price_da: number;
  active: boolean;
  transit_types: TransitType;
}

export interface Schedule {
  id: string;
  route_id: string;
  departure_time: string;
  arrival_time: string;
  days_of_week: number[];
  available_seats: number;
  routes: Route;
}

export const useTransitTypes = () => {
  return useQuery({
    queryKey: ['transitTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transit_types')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as TransitType[];
    },
  });
};

export const useRoutes = (transitTypeId?: string, origin?: string, destination?: string) => {
  return useQuery({
    queryKey: ['routes', transitTypeId, origin, destination],
    queryFn: async () => {
      let query = supabase
        .from('routes')
        .select(`
          *,
          transit_types (*)
        `)
        .eq('active', true);

      if (transitTypeId) {
        query = query.eq('transit_type_id', transitTypeId);
      }
      if (origin) {
        query = query.ilike('origin', `%${origin}%`);
      }
      if (destination) {
        query = query.ilike('destination', `%${destination}%`);
      }

      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data as Route[];
    },
    enabled: true,
  });
};

export const useSchedules = (routeId?: string) => {
  return useQuery({
    queryKey: ['schedules', routeId],
    queryFn: async () => {
      let query = supabase
        .from('schedules')
        .select(`
          *,
          routes (
            *,
            transit_types (*)
          )
        `);

      if (routeId) {
        query = query.eq('route_id', routeId);
      }

      const { data, error } = await query.order('departure_time');
      
      if (error) throw error;
      return data as Schedule[];
    },
    enabled: !!routeId,
  });
};
