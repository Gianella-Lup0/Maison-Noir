import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import GestionCupones from './pages/GestionCupones'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:categoriaId" element={<Productos />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin/cupones" element={<GestionCupones />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}
