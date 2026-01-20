export default function MetricCard({ icon: Icon, label, value, subtext }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtext && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtext}</p>
          )}
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
          <Icon className="w-5 h-5 text-accent" />
        </div>
      </div>
    </div>
  );
}
