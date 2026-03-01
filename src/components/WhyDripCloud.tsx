export default function WhyDripCloud() {
  return (
    <section 
      data-testid="why-dripcloud"
      className="py-16 bg-gradient-to-br from-purple-50 to-purple-100"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why DripCloud
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* No Minimum Orders */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">No Minimum Orders</h3>
            <p className="text-gray-600">
              Order one or one thousand. Every order is printed on demand.
            </p>
          </div>

          {/* Zero Inventory Risk */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Zero Inventory Risk</h3>
            <p className="text-gray-600">
              No upfront costs, no unsold stock. Only pay when customers buy.
            </p>
          </div>

          {/* Your Brand, Your Way */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Your Brand, Your Way</h3>
            <p className="text-gray-600">
              Full creative control over your merchandise and storefront.
            </p>
          </div>

          {/* We Handle Fulfillment */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">We Handle Fulfillment</h3>
            <p className="text-gray-600">
              From printing to shipping, we take care of everything.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}