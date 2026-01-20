import { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import PortfolioMetrics from './components/PortfolioMetrics';
import PropertyHeatmap from './components/PropertyHeatmap';
import ActionPriorityList from './components/ActionPriorityList';
import TrendChart from './components/TrendChart';
import { generateSampleData, generateTrendData } from './data/sampleData';

function App() {
  const { properties, metrics } = useMemo(() => generateSampleData(), []);
  const trendData = useMemo(() => generateTrendData(), []);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [filters, setFilters] = useState({
    location: 'all',
    status: 'all'
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Get unique locations for filter dropdown
  const locations = useMemo(() => {
    return [...new Set(properties.map(p => p.location))].sort();
  }, [properties]);

  // Filter properties based on selected filters
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const locationMatch = filters.location === 'all' || property.location === filters.location;
      const statusMatch = filters.status === 'all' || property.status === filters.status;
      return locationMatch && statusMatch;
    });
  }, [properties, filters]);

  // Calculate metrics for filtered properties
  const filteredMetrics = useMemo(() => {
    if (filters.location === 'all' && filters.status === 'all') {
      return metrics;
    }

    const totalUnits = filteredProperties.reduce((sum, p) => sum + p.totalUnits, 0);
    const totalVacant = filteredProperties.reduce((sum, p) => sum + p.vacantUnits, 0);
    const vacancyRate = totalUnits > 0 ? (totalVacant / totalUnits) * 100 : 0;
    const avgDTL = filteredProperties.length > 0
      ? filteredProperties.reduce((sum, p) => sum + p.avgDaysToLease, 0) / filteredProperties.length
      : 0;
    const toursToday = filteredProperties.reduce((sum, p) => sum + p.scheduledTours, 0);
    const applicationsToday = filteredProperties.reduce((sum, p) => sum + p.pendingApplications, 0);

    return {
      totalUnits,
      vacancyRate: parseFloat(vacancyRate.toFixed(1)),
      avgDaysToLease: parseFloat(avgDTL.toFixed(1)),
      toursToday,
      applicationsToday,
      leasesSignedToday: Math.round(metrics.leasesSignedToday * (filteredProperties.length / properties.length))
    };
  }, [filteredProperties, metrics, filters, properties.length]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          filters={filters}
          setFilters={setFilters}
          locations={locations}
        />
        <PortfolioMetrics metrics={filteredMetrics} propertyCount={filteredProperties.length} />
        <PropertyHeatmap properties={filteredProperties} />
        <ActionPriorityList properties={filteredProperties} />
        <TrendChart data={trendData} darkMode={darkMode} />
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Arboreal Leasing Velocity Dashboard - Built for Arboreal Management
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
