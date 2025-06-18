
-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create transit types table
CREATE TABLE public.transit_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transit_type_id UUID REFERENCES public.transit_types NOT NULL,
  name TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price_da INTEGER NOT NULL, -- Price in Algerian Dinars
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create schedule table
CREATE TABLE public.schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_id UUID REFERENCES public.routes NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  days_of_week INTEGER[] NOT NULL, -- Array: 0=Sunday, 1=Monday, etc.
  available_seats INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  route_id UUID REFERENCES public.routes NOT NULL,
  schedule_id UUID REFERENCES public.schedules NOT NULL,
  booking_date DATE NOT NULL,
  seat_number TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transit_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Transit types policies (public read)
CREATE POLICY "Anyone can view transit types" ON public.transit_types
  FOR SELECT USING (true);

-- Routes policies (public read)
CREATE POLICY "Anyone can view routes" ON public.routes
  FOR SELECT USING (true);

-- Schedules policies (public read)
CREATE POLICY "Anyone can view schedules" ON public.schedules
  FOR SELECT USING (true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, preferred_language)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'name', new.email),
    COALESCE(new.raw_user_meta_data ->> 'preferred_language', 'en')
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample transit types
INSERT INTO public.transit_types (name, icon, color, description) VALUES
  ('ETUSB', '🚌', 'from-blue-500 to-blue-600', 'University Transport'),
  ('Bus', '🚍', 'from-green-500 to-green-600', 'City Buses'),
  ('Train', '🚆', 'from-purple-500 to-purple-600', 'Railway Service');

-- Insert sample routes
WITH transit_ids AS (
  SELECT id, name FROM public.transit_types
)
INSERT INTO public.routes (transit_type_id, name, origin, destination, duration_minutes, price_da)
SELECT 
  t.id,
  t.name || ' - ' || route_info.origin || ' to ' || route_info.destination,
  route_info.origin,
  route_info.destination,
  route_info.duration,
  route_info.price
FROM transit_ids t
CROSS JOIN (
  VALUES 
    ('University', 'City Center', 30, 120),
    ('Batna Station', 'Constantine', 180, 800),
    ('Airport', 'Downtown', 45, 200),
    ('Mall', 'University', 25, 100)
) AS route_info(origin, destination, duration, price)
WHERE t.name IN ('ETUSB', 'Bus', 'Train');

-- Insert sample schedules
INSERT INTO public.schedules (route_id, departure_time, arrival_time, days_of_week, available_seats)
SELECT 
  r.id,
  times.departure,
  times.arrival,
  ARRAY[1,2,3,4,5], -- Monday to Friday
  50
FROM public.routes r
CROSS JOIN (
  VALUES 
    ('08:00'::time, '08:30'::time),
    ('14:30'::time, '15:00'::time),
    ('16:45'::time, '17:15'::time),
    ('18:00'::time, '18:30'::time)
) AS times(departure, arrival);
