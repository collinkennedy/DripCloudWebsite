import { TrendingUp, Lightbulb, Target } from 'lucide-react'

const tips = [
  {
    icon: TrendingUp,
    title: 'Optimize your listings',
    description: 'Products with detailed descriptions sell 40% more.',
  },
  {
    icon: Lightbulb,
    title: 'Add more designs',
    description: 'Stores with 10+ products see 3x more traffic.',
  },
  {
    icon: Target,
    title: 'Share on social media',
    description: 'Connect your storefront to reach more customers.',
  },
]

export default function GrowthCenter() {
  return (
    <div data-testid="growth-center" className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">Growth Center</h3>
      <div className="mt-4 space-y-4">
        {tips.map((tip) => (
          <div key={tip.title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
              <tip.icon size={16} className="text-[#6B2D8B]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{tip.title}</p>
              <p className="text-xs text-gray-500">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
