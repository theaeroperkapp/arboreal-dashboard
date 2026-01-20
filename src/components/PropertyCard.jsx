import { MapPin } from 'lucide-react';

const statusColors = {
  healthy: 'bg-healthy',
  watch: 'bg-watch',
  urgent: 'bg-urgent'
};

const statusBorders = {
  healthy: 'border-healthy',
  watch: 'border-watch',
  urgent: 'border-urgent'
};

export default function PropertyCard({ property, onClick }) {
  const { name, location, vacantUnits, totalUnits, avgDaysToLease, status } = property;

  return (
    <div
      onClick={() => onClick(property)}
      className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${statusBorders[status]} cursor-pointer hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
        <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status]}`} />
      </div>

      <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
        <MapPin className="w-3 h-3" />
        <span>{location}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-gray-500">Vacant</p>
          <p className="font-semibold text-gray-900">{vacantUnits} / {totalUnits}</p>
        </div>
        <div>
          <p className="text-gray-500">Avg DTL</p>
          <p className={`font-semibold ${status === 'urgent' ? 'text-urgent' : status === 'watch' ? 'text-watch' : 'text-gray-900'}`}>
            {avgDaysToLease} days
          </p>
        </div>
      </div>
    </div>
  );
}
