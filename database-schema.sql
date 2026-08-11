-- Run this in your Supabase SQL Editor

-- Create an enum for subscription status
CREATE TYPE subscription_status AS ENUM ('free', 'active', 'past_due', 'canceled');

-- Create the users table (syncs with auth.users if needed, or used standalone)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  paddle_customer_id TEXT,
  paddle_subscription_id TEXT,
  subscription_status subscription_status DEFAULT 'free'::subscription_status,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can only read and update their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Create saved_calculators table
CREATE TABLE public.saved_calculators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  calculator_slug TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'uncategorized',
  saved_name TEXT NOT NULL,
  input_state JSONB NOT NULL DEFAULT '{}'::jsonb,
  core_metric NUMERIC,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.saved_calculators ENABLE ROW LEVEL SECURITY;

-- Users can only read, insert, update, and delete their own saved calculators
CREATE POLICY "Users can view own saved calculators" ON public.saved_calculators FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public can view shared calculators" ON public.saved_calculators FOR SELECT USING (is_public = true);
CREATE POLICY "Users can insert own saved calculators" ON public.saved_calculators FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own saved calculators" ON public.saved_calculators FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved calculators" ON public.saved_calculators FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update the last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_updated = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_saved_calculators_last_updated
BEFORE UPDATE ON public.saved_calculators
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();
