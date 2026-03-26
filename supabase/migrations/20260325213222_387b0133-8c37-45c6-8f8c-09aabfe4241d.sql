-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  budget TEXT DEFAULT '',
  configuration TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'nouveau',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create offers table
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT NOT NULL,
  surface TEXT DEFAULT '',
  rooms TEXT DEFAULT '',
  type TEXT NOT NULL DEFAULT 'villa',
  features TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Leads: anyone can insert (contact form), only authenticated can read/update/delete
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update leads" ON public.leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);

-- Offers: anyone can read (public), only authenticated can manage
CREATE POLICY "Anyone can view active offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert offers" ON public.offers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update offers" ON public.offers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete offers" ON public.offers FOR DELETE TO authenticated USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for offer images
INSERT INTO storage.buckets (id, name, public) VALUES ('offer-images', 'offer-images', true);

CREATE POLICY "Anyone can view offer images" ON storage.objects FOR SELECT USING (bucket_id = 'offer-images');
CREATE POLICY "Authenticated users can upload offer images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'offer-images');
CREATE POLICY "Authenticated users can update offer images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'offer-images');
CREATE POLICY "Authenticated users can delete offer images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'offer-images');