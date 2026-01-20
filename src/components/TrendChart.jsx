import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function TrendChart({ data, darkMode }) {
  const gridColor = darkMode ? '#374151' : '#f0f0f0';
  const axisColor = darkMode ? '#4b5563' : '#e5e7eb';
  const textColor = darkMode ? '#9ca3af' : '#6b7280';
  const tooltipBg = darkMode ? '#1f2937' : 'white';
  const tooltipBorder = darkMode ? '#374151' : '#e5e7eb';

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">30-Day Vacancy Trend</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: textColor }}
                tickLine={false}
                axisLine={{ stroke: axisColor }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 6]}
                tick={{ fontSize: 12, fill: textColor }}
                tickLine={false}
                axisLine={{ stroke: axisColor }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: darkMode ? '#f3f4f6' : '#111827'
                }}
                formatter={(value) => [`${value}%`, 'Vacancy Rate']}
                labelStyle={{ color: darkMode ? '#f3f4f6' : '#111827' }}
              />
              <ReferenceLine
                y={3}
                stroke="#059669"
                strokeDasharray="5 5"
                label={{ value: 'Target 3%', fill: '#059669', fontSize: 12, position: 'right' }}
              />
              <Line
                type="monotone"
                dataKey="vacancy"
                stroke="#059669"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-accent" />
            <span className="text-gray-600 dark:text-gray-400">Vacancy Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-accent border-dashed" style={{ borderTopWidth: 2, borderTopStyle: 'dashed' }} />
            <span className="text-gray-600 dark:text-gray-400">Target (3%)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
