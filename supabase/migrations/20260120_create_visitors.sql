CREATE TABLE IF NOT EXISTS visitors (
  id SERIAL PRIMARY KEY,
  ip_address TEXT,
  city TEXT,
  region TEXT,
  country TEXT,
  user_agent TEXT,
  referrer TEXT,
  page_path TEXT,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON visitors
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous reads" ON visitors
  FOR SELECT TO anon
  USING (true);
