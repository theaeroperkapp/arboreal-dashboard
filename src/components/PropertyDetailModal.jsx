import { X, MapPin, Calendar, FileText, Users, Lightbulb } from 'lucide-react';
import { getRecommendedAction } from '../data/sampleData';

const statusLabels = {
  healthy: 'Healthy',
  watch: 'Watch',
  urgent: 'Urgent'
};

const statusColors = {
  healthy: 'bg-healthy text-white',
  watch: 'bg-watch text-white',
  urgent: 'bg-urgent text-white'
};

export default function PropertyDetailModal({ property, onClose }) {
  if (!property) return null;

  const recommendation = getRecommendedAction(property);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{property.name}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{property.location}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[property.status]}`}>
              {statusLabels[property.status]}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {property.type}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Total Units</p>
              <p className="text-2xl font-bold text-gray-900">{property.totalUnits}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Vacant Units</p>
              <p className="text-2xl font-bold text-gray-900">{property.vacantUnits}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Avg Days to Lease</p>
              <p className={`text-2xl font-bold ${property.status === 'urgent' ? 'text-urgent' : property.status === 'watch' ? 'text-watch' : 'text-healthy'}`}>
                {property.avgDaysToLease}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Vacancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {((property.vacantUnits / property.totalUnits) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-gray-900">{property.scheduledTours} Tours Scheduled</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-gray-900">{property.pendingApplications} Pending Applications</p>
                <p className="text-xs text-gray-500">Awaiting review</p>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Recommended Action</p>
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
