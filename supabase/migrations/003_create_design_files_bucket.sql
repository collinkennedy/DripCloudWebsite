-- Create design-files storage bucket (public so Printful can download)
INSERT INTO storage.buckets (id, name, public)
VALUES ('design-files', 'design-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload design files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'design-files');

-- Allow authenticated users to read their own files
CREATE POLICY "Authenticated users can read design files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'design-files');

-- Allow public read access (Printful needs to download)
CREATE POLICY "Public read access for design files"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'design-files');
