import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()
// localStorage存儲的key名稱
const cartkey = 'funeralshoppingcart'

// 購物車初始狀態為空
const projectemptyCart = []

export function CartProvider2({ children }) {
  const [cartItems, setCartItems] = useState(projectemptyCart)


  const removeCartItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.project_id !== id)
      localStorage.setItem(cartkey, JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  useEffect(() => {
    const str = localStorage.getItem(cartkey)
    if (str) {
      try {
        const data = JSON.parse(str)
        if (Array.isArray(data)) {
          setCartItems(data)
        }
      } catch (error) {
        console.error('Failed to parse cart data:', error)
      }
    }
  }, [])
  return (
    <CartContext.Provider value={{ cartItems, removeCartItem }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartContext
