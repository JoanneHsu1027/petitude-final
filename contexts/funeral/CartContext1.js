import { createContext, useContext, useEffect, useState } from 'react'

const CartContext1 = createContext()
const cartKeys = 'funeralShoppingCart'

// 生前契約初始空狀態
const projectEmptyCart = []

export function CartProvider2({ children }) {
  const [cartProjects, setCartProjects] = useState(projectEmptyCart)

  // 加到購物車
  const addToCarts = (project) => {
    setCartProjects((prevProjects) => {
      const existingProjectIndex = prevProjects.findIndex(
        (items) => items.project_id === project.project_id,
      )

      // 如果项目不存在，添加到购物车
      const newProjects = [...prevProjects, { ...project, qty: 1 }]
      localStorage.setItem(cartKeys, JSON.stringify(newProjects))
      return newProjects
    })
  }

  // 當用戶重刷頁面時，從 localStorage 載入狀態
  useEffect(() => {
    const storedCart1 = localStorage.getItem(cartKeys)
    if (storedCart1) {
      try {
        const parsedCart1 = JSON.parse(storedCart1)
        if (Array.isArray(parsedCart1)) {
          setCartProjects(parsedCart1)
        }
      } catch (error) {
        console.error('Error parsing cart data:', error)
      }
    }
  }, [])

  return (
    <CartContext1.Provider
      value={{
        cartProjects,
        addToCarts,
      }}
    >
      {children}
    </CartContext1.Provider>
  )
}
// 這個CartContext 參數要放進addToCarts裡面
export const useCart1 = () => useContext(CartContext1)
export default CartContext1
