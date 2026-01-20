import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eitdpdfxbhwrijptgrzj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpdGRwZGZ4Ymh3cmlqcHRncnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NDg1NjQsImV4cCI6MjA4NDUyNDU2NH0.lk85YyzJNHX1obnLP9OpjjLyTmJijE3-khcY1nY0r8w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
