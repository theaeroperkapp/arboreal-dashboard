import { useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyDetailModal from './PropertyDetailModal';

export default function PropertyHeatmap({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Sort by status (urgent first) then by days-to-lease
  const sortedProperties = [...properties].sort((a, b) => {
    const statusOrder = { urgent: 0, watch: 1, healthy: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return b.avgDaysToLease - a.avgDaysToLease;
  });

  const statusCounts = {
    urgent: properties.filter(p => p.status === 'urgent').length,
    watch: properties.filter(p => p.status === 'watch').length,
    healthy: properties.filter(p => p.status === 'healthy').length
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Property Status</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-urgent" />
            <span className="text-gray-600">Urgent ({statusCounts.urgent})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-watch" />
            <span className="text-gray-600">Watch ({statusCounts.watch})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-healthy" />
            <span className="text-gray-600">Healthy ({statusCounts.healthy})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={setSelectedProperty}
          />
        ))}
      </div>

      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  );
}
