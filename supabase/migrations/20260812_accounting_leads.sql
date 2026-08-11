-- Create the accounting_leads table
CREATE TABLE IF NOT EXISTS public.accounting_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    phone TEXT,
    best_time_to_connect TEXT,
    request_details TEXT,
    status TEXT DEFAULT 'new' NOT NULL, -- 'new', 'contacted', 'closed'
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.accounting_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to INSERT leads (for the public form)
CREATE POLICY "Allow public insert to accounting_leads" 
ON public.accounting_leads 
FOR INSERT 
TO public
WITH CHECK (true);

-- Only authenticated users (admins) can SELECT, UPDATE, DELETE leads
CREATE POLICY "Allow authenticated access to accounting_leads" 
ON public.accounting_leads 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated update to accounting_leads" 
ON public.accounting_leads 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Notify when a new lead comes in (optional, if you have webhook triggers setup)
-- This ensures the table is ready for the basic admin backend later.
