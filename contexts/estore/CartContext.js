import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.pk_product_id === product.pk_product_id,
      )
      if (existingItem) {
        return prevItems.map((item) =>
          item.pk_product_id === product.pk_product_id
            ? { ...item, qty: item.qty + 1 }
            : item,
        )
      }
      return [...prevItems, { ...product, qty: 1 }]
    })
  }

  const updateCartItemQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.pk_product_id === id
            ? { ...item, qty: Math.max(0, item.qty + change) }
            : item,
        )
        .filter((item) => item.qty > 0),
    )
  }

  const removeCartItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.pk_product_id !== id),
    )
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItemQuantity, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
