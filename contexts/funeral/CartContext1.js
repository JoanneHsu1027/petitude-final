import { createContext, useContext, useEffect, useState } from 'react'

const CartContext1 = createContext()
// localstorage紀錄的key
const cartKeys = 'funeralShoppingCart'

// 生前契約初始空狀態
const projectEmptyCart = []

export function CartProvider2({ children }) {
  const [cartProjects, setCartProjects] = useState(projectEmptyCart)

  // 添加項目至購物車
  const addToCarts = (project) => {
    setCartProjects((prevProjects) => {
      const existingProjectIndex = prevProjects.findIndex(
        (items) => items.project_id === project.project_id,
      )
      const newProjects = [...prevProjects, { ...project, qty: 1 }]
      localStorage.setItem(cartKeys, JSON.stringify(newProjects))
      return newProjects
    })
  }
  // 刪除購物車中項目
  const removeCartProject = (idx) => {
    setCartProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter(
        (items) => items.project_id !== idx,
      )
      localStorage.setItem(cartKeys, JSON.stringify(updatedProjects))
      return updatedProjects
    })
  }

  const clearCart1 = () => {
    // 清空localStorage
    localStorage.removeItem(cartKeys)

    // 重置Context中的cartItems狀態
    setCartProjects([])
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
        removeCartProject,
      }}
    >
      {children}
    </CartContext1.Provider>
  )
}
// 這個CartContext1 參數要放進addToCarts裡面
export const useCart1 = () => useContext(CartContext1)
export default CartContext1
