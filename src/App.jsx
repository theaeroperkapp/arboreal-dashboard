import { useMemo } from 'react';
import Header from './components/Header';
import PortfolioMetrics from './components/PortfolioMetrics';
import PropertyHeatmap from './components/PropertyHeatmap';
import ActionPriorityList from './components/ActionPriorityList';
import TrendChart from './components/TrendChart';
import { generateSampleData, generateTrendData } from './data/sampleData';

function App() {
  const { properties, metrics } = useMemo(() => generateSampleData(), []);
  const trendData = useMemo(() => generateTrendData(), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PortfolioMetrics metrics={metrics} />
        <PropertyHeatmap properties={properties} />
        <ActionPriorityList properties={properties} />
        <TrendChart data={trendData} />
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Arboreal Leasing Velocity Dashboard - Built for Arboreal Management
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
