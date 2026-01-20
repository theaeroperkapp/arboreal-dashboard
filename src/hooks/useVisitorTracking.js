import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useVisitorTracking() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get IP and location data from free API
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();

        // Insert visitor record
        await supabase.from('visitors').insert({
          ip_address: geoData.ip || 'unknown',
          city: geoData.city || 'unknown',
          region: geoData.region || 'unknown',
          country: geoData.country_name || 'unknown',
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          page_path: window.location.pathname
        });
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Only track once per session
    const hasTracked = sessionStorage.getItem('visitor_tracked');
    if (!hasTracked) {
      trackVisitor();
      sessionStorage.setItem('visitor_tracked', 'true');
    }
  }, []);
}
