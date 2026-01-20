import { AlertTriangle, ArrowRight } from 'lucide-react';
import { calculatePriority, getRecommendedAction } from '../data/sampleData';

export default function ActionPriorityList({ properties }) {
  const prioritizedProperties = properties
    .map(p => ({
      ...p,
      priority: calculatePriority(p),
      recommendation: getRecommendedAction(p)
    }))
    .filter(p => p.status !== 'healthy')
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);

  if (prioritizedProperties.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Action Priority</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400">All properties are performing well!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Action Priority</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {prioritizedProperties.map((property, index) => (
          <div
            key={property.id}
            className={`p-4 flex items-center gap-4 ${index !== prioritizedProperties.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              property.status === 'urgent' ? 'bg-urgent/10 text-urgent' : 'bg-watch/10 text-watch'
            }`}>
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">{property.name}</h3>
                {property.status === 'urgent' && (
                  <AlertTriangle className="w-4 h-4 text-urgent flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {property.vacantUnits} vacant × {property.avgDaysToLease} avg DTL
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-sm text-accent">
              <span className="truncate max-w-48">{property.recommendation}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
