import React, { useEffect, useState } from 'react'
import { FavoriteProduct_GET, FavoriteProduct_DELETE } from '@/configs/api-path'
import axios from 'axios'
import { useAuth } from '@/contexts/member/auth-context'
import Swal from 'sweetalert2'

const FavoriteProduct = () => {
  const { auth } = useAuth()
  const [favoriteProducts, setFavoriteProducts] = useState([]) // 初始值為空陣列

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

        // 確保 response.data.data 是一個陣列
        setFavoriteProducts(
          Array.isArray(response.data.data) ? response.data.data : [],
        )
      } catch (error) {
        console.error('無法獲取收藏商品', error)
        setFavoriteProducts([]) // 發生錯誤時設置為空陣列
      }
    }

    fetchFavoriteProducts()
  }, [auth.b2c_id, auth.token])

  const handleDelete = async (product_favorite_id) => {
    const result = await Swal.fire({
      title: '你確定要取消收藏嗎??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定！',
    })

    if (result.isConfirmed) {
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
        Swal.fire({
          title: '你已經取消收藏!',
          icon: 'success',
        })
      } catch (error) {
        console.error('無法刪除收藏的商品', error)
      }
    }
  }

  return (
    <div className="p-4">
      <h3 className="mb-4">收藏商品</h3>
      {favoriteProducts.length > 0 ? (
        <div className="row">
          {favoriteProducts.map((product) => (
            <div
              className="col-6 col-lg-4 col-xl-3 my-2"
              key={product.product_favorite_id}
            >
              <div className="card">
                <a href={`estore/product/${product.fk_product_id}`}>
                  <img
                    src={`http://localhost:3001/estore/A${product.fk_product_id}.png`}
                    className="card-img-top w-100 p-3"
                    alt={product.product_name}
                  />
                </a>
                <div className="card-body">
                  <h4 className="card-title">{product.product_name}</h4>
                  <p className="card-text">{product.product_price} 元</p>
                  <button
                    className="btn btn-danger position-absolute top-0 end-0 m-2"
                    onClick={() => handleDelete(product.product_favorite_id)}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>沒有收藏的商品</p>
      )}
    </div>
  )
}

export default FavoriteProduct
