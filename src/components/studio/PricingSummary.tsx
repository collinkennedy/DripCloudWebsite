interface PricingSummaryProps {
  retailPrice: number
  baseCost: number
}

export default function PricingSummary({ retailPrice, baseCost }: PricingSummaryProps) {
  const profit = retailPrice - baseCost

  return (
    <div data-testid="pricing-summary" className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-900">Pricing Breakdown</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Retail price</span>
          <span className="font-medium text-gray-900">${retailPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Base cost</span>
          <span className="font-medium text-gray-900">−${baseCost.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Your profit</span>
            <span className={`font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${profit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
