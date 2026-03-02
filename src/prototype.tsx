import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClothesLine from './components/ClothesLine'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ClothesLine />
    </div>
  </StrictMode>,
)
