export interface CatalogColor {
  color_code: string
  color_name: string
}

export interface CatalogVariant {
  id: number
  product_id: number
  name: string
  size: string
  color: string
  color_code: string
  price: string
  in_stock: boolean
}

export interface CatalogProduct {
  id: number
  type_name: string
  title: string
  description: string
  image: string
  variant_count: number
  currency: string
  min_price?: number
}

export type WizardStep = 'PRODUCT' | 'DESIGN' | 'CONFIRM'

export interface WizardState {
  step: WizardStep
  selectedProduct: CatalogProduct | null
  selectedVariants: CatalogVariant[]
  selectedColors: CatalogColor[]
  selectedSizes: string[]
  designFileUrl: string | null
  designFileName: string | null
  placement: 'front' | 'back'
  mockupUrls: string[]
  title: string
  description: string
  retailPrice: number
}
