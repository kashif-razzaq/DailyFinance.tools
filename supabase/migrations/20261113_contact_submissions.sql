-- Contact form submissions (public /contact form: paid promotion, guest
-- posting, white label, other). Email delivery goes to
-- info@dailyfinance.tools; this table is the backup record.
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('paid-promotion', 'guest-posting', 'white-label', 'other')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone may submit the public contact form (INSERT only).
CREATE POLICY "Allow public insert to contact_submissions"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Deliberately NO SELECT / UPDATE / DELETE policy: submissions are readable
-- only from the Supabase dashboard (service role). No app user — signed in
-- or not — can read, change or delete them through the API.
