import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import StudioTopBar from '../../components/studio/StudioTopBar'
import SelectProductStep from './SelectProductStep'
import DesignStep from './DesignStep'
import ConfirmStep from './ConfirmStep'
import { useCreateProduct } from '../../hooks/useCreateProduct'
import type { WizardStep, WizardState, CatalogProduct, CatalogColor } from '../../types/catalog'

const initialState: WizardState = {
  step: 'PRODUCT',
  selectedProduct: null,
  selectedVariantIds: [],
  selectedColors: [],
  selectedSizes: [],
  designFileUrl: null,
  designFileName: null,
  placement: 'front',
  mockupUrls: [],
  title: '',
  description: '',
  retailPrice: 29.99,
}

export default function StudioPage() {
  const navigate = useNavigate()
  const [state, setState] = useState<WizardState>(initialState)
  const { create, creating, error: createError } = useCreateProduct()

  const setStep = (step: WizardStep) => setState((s) => ({ ...s, step }))

  const handleSelectProduct = useCallback((product: CatalogProduct) => {
    setState((s) => ({
      ...s,
      selectedProduct: product,
      selectedColors: [],
      selectedSizes: [],
      retailPrice: (product.min_price ?? 15) * 2,
    }))
  }, [])

  const handleColorToggle = useCallback((color: CatalogColor) => {
    setState((s) => {
      const exists = s.selectedColors.some((c) => c.color_code === color.color_code)
      return {
        ...s,
        selectedColors: exists
          ? s.selectedColors.filter((c) => c.color_code !== color.color_code)
          : [...s.selectedColors, color],
      }
    })
  }, [])

  const handleSizeToggle = useCallback((size: string) => {
    setState((s) => ({
      ...s,
      selectedSizes: s.selectedSizes.includes(size)
        ? s.selectedSizes.filter((s2) => s2 !== size)
        : [...s.selectedSizes, size],
    }))
  }, [])

  const handleDesignUploaded = useCallback((url: string, name: string) => {
    setState((s) => ({ ...s, designFileUrl: url, designFileName: name }))
  }, [])

  const handleMockupsGenerated = useCallback((urls: string[]) => {
    setState((s) => ({ ...s, mockupUrls: urls }))
  }, [])

  const handleCreateProduct = async () => {
    if (!state.selectedProduct || !state.designFileUrl) return
    const result = await create({
      productId: state.selectedProduct.id,
      variantIds: state.selectedVariantIds,
      title: state.title || state.selectedProduct.title,
      description: state.description,
      retailPrice: state.retailPrice,
      designFileUrl: state.designFileUrl,
      placement: state.placement,
      mockupUrls: state.mockupUrls,
    })
    if (result) {
      navigate('/dashboard/products')
    }
  }

  const variantIds = state.selectedVariantIds

  return (
    <div data-testid="studio-page" className="flex flex-1 flex-col min-h-0">
      {state.step === 'PRODUCT' && (
        <>
          <StudioTopBar currentStep="PRODUCT" />
          <SelectProductStep
            selectedProduct={state.selectedProduct}
            selectedColors={state.selectedColors}
            selectedSizes={state.selectedSizes}
            onSelectProduct={handleSelectProduct}
            onColorToggle={handleColorToggle}
            onSizeToggle={handleSizeToggle}
            onContinue={(ids: number[]) => setState((s) => ({ ...s, step: 'DESIGN', selectedVariantIds: ids }))}
          />
        </>
      )}

      {state.step === 'DESIGN' && state.selectedProduct && (
        <DesignStep
          selectedProduct={state.selectedProduct}
          variantIds={variantIds}
          placement={state.placement}
          onPlacementChange={(p) => setState((s) => ({ ...s, placement: p }))}
          onDesignUploaded={handleDesignUploaded}
          onMockupsGenerated={handleMockupsGenerated}
          onContinue={() => setStep('CONFIRM')}
          onBack={() => setStep('PRODUCT')}
        />
      )}

      {state.step === 'CONFIRM' && state.selectedProduct && (
        <ConfirmStep
          mockupUrls={state.mockupUrls}
          productTitle={state.selectedProduct.title}
          baseCost={state.selectedProduct.min_price ?? 0}
          title={state.title}
          description={state.description}
          retailPrice={state.retailPrice}
          onTitleChange={(t) => setState((s) => ({ ...s, title: t }))}
          onDescriptionChange={(d) => setState((s) => ({ ...s, description: d }))}
          onRetailPriceChange={(p) => setState((s) => ({ ...s, retailPrice: p }))}
          onCreateProduct={handleCreateProduct}
          onBack={() => setStep('DESIGN')}
          creating={creating}
        />
      )}

      {createError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
          {createError}
        </div>
      )}
    </div>
  )
}
