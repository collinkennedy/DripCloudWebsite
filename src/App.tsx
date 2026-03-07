import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHomePage from './pages/DashboardHomePage'
import ProductsPage from './pages/ProductsPage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<PlaceholderPage />} />
        <Route path="storefront" element={<PlaceholderPage />} />
        <Route path="analytics" element={<PlaceholderPage />} />
        <Route path="settings" element={<PlaceholderPage />} />
      </Route>
    </Routes>
  )
}

export default App
