export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Design',
      icon: '🎨',
      description: 'Upload your designs or work with our team to create custom merchandise.'
    },
    {
      number: '02',
      title: 'Sell',
      icon: '🛒',
      description: 'Your customers order from your branded storefront. We handle the rest.'
    },
    {
      number: '03',
      title: 'Fulfill',
      icon: '📦',
      description: 'We print, pack, and ship every order on demand. No inventory needed.'
    }
  ]

  return (
    <section 
      data-testid="how-it-works" 
      className="py-16 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Step Number */}
              <div className="mb-4">
                <span className="inline-block text-sm font-semibold text-[#6B2D8B] bg-[#6B2D8B]/10 px-3 py-1 rounded-full">
                  {step.number}
                </span>
              </div>
              
              {/* Icon */}
              <div className="mb-6">
                <span className="text-4xl" role="img" aria-label={step.title}>
                  {step.icon}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}