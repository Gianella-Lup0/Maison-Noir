import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    setCartItems(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCantidad = (id, cantidad) => {
    if (cantidad < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, cantidad } : item)
    );
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCantidad, totalItems, totalPrecio }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
