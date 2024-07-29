import React, { useEffect, useState } from 'react'
import { FavoriteProduct_GET, FavoriteProduct_DELETE } from '@/configs/api-path'
import axios from 'axios'
import { useAuth } from '@/contexts/member/auth-context'

const FavoriteProduct = ({ onEdit }) => {
  const { auth } = useAuth()
  const [favoriteProducts, setFavoriteProducts] = useState([])

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (!auth.b2c_id) return

      try {
        const response = await axios.get(
          `${FavoriteProduct_GET}/${auth.b2c_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          },
        )
        setFavoriteProducts(response.data.data)
      } catch (error) {
        console.error('無法獲取收藏商品', error)
      }
    }

    fetchFavoriteProducts()
  }, [auth.b2c_id, auth.token])

  const handleDelete = async (product_favorite_id) => {
    try {
      await axios.delete(FavoriteProduct_DELETE, {
        data: { product_favorite_id },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      })
      setFavoriteProducts(
        favoriteProducts.filter(
          (product) => product.product_favorite_id !== product_favorite_id,
        ),
      )
    } catch (error) {
      console.error('無法刪除收藏的商品', error)
    }
  }

  return (
    <div className="p-4">
      <h3 className="mb-4">收藏商品</h3>
      {favoriteProducts.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">商品ID</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品價格</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            {favoriteProducts.map((product) => (
              <tr key={product.product_favorite_id}>
                <td>{product.fk_product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.product_price} 元</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.product_favorite_id)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>沒有收藏的商品</p>
      )}
    </div>
  )
}

export default FavoriteProduct
