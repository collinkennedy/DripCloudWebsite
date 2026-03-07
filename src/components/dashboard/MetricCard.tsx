interface MetricCardProps {
  label: string
  value: string
  change?: string
}

export default function MetricCard({ label, value, change }: MetricCardProps) {
  const isPositive = change?.startsWith('+')

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {change && (
        <span
          data-testid="metric-change"
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            isPositive
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {change}
        </span>
      )}
    </div>
  )
}
