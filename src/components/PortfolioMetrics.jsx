import { Home, TrendingDown, Clock, Calendar, FileText, PenTool } from 'lucide-react';
import MetricCard from './MetricCard';

export default function PortfolioMetrics({ metrics, propertyCount }) {
  const cards = [
    {
      icon: Home,
      label: 'Total Units',
      value: metrics.totalUnits.toLocaleString(),
      subtext: `${propertyCount} properties`
    },
    {
      icon: TrendingDown,
      label: 'Vacancy Rate',
      value: `${metrics.vacancyRate}%`,
      subtext: 'Target: 3.0%'
    },
    {
      icon: Clock,
      label: 'Avg Days to Lease',
      value: metrics.avgDaysToLease,
      subtext: 'days'
    },
    {
      icon: Calendar,
      label: 'Tours Today',
      value: metrics.toursToday,
      subtext: 'scheduled'
    },
    {
      icon: FileText,
      label: 'Applications',
      value: metrics.applicationsToday,
      subtext: 'pending review'
    },
    {
      icon: PenTool,
      label: 'Leases Signed',
      value: metrics.leasesSignedToday,
      subtext: 'today'
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card, index) => (
          <MetricCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
