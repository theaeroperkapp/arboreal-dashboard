import { MapPin, AlertCircle } from 'lucide-react';

export default function Filters({ filters, setFilters, locations }) {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'watch', label: 'Watch' },
    { value: 'healthy', label: 'Healthy' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    ...locations.map(loc => ({ value: loc, label: loc }))
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-400" />
        <select
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
        >
          {locationOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-gray-400" />
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(filters.location !== 'all' || filters.status !== 'all') && (
        <button
          onClick={() => setFilters({ location: 'all', status: 'all' })}
          className="text-sm text-accent hover:text-accent/80 font-medium"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
