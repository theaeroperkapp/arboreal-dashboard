export default function MetricCard({ icon: Icon, label, value, subtext }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtext && (
            <p className="text-sm text-gray-500 mt-1">{subtext}</p>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <Icon className="w-5 h-5 text-accent" />
        </div>
      </div>
    </div>
  );
}
