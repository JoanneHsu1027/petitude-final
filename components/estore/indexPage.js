import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProductList } from '@/configs/estore/api-path'
import styles from '@/styles/estore/estore.module.css'
import { useCart } from '@/contexts/estore/CartContext'
import swal from 'sweetalert2'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function IndexEstore() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  const fetchData = async () => {
    try {
      setData((prevData) => ({ ...prevData, success: false }))
      const res = await axios.get(ProductList)
      const myData = res.data
      console.log('Received data:', myData)
      if (myData.success) {
        setData(myData)
      } else {
        console.error('API request was not successful:', myData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      setData((prevData) => ({ ...prevData, success: false }))
    }
  }
  const getRandomItems = (items, count) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [])

  const handleAddItem = (event, product) => {
    event.preventDefault()
    event.stopPropagation()
    addToCart(product)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div>
      <div
        className={`container-fluid d-none d-md-block ${styles.full}`}
        style={{ padding: 60 + 'px' }}
      >
        <div className="row mt-2 pt-2 mb-0 pb-0 d-flex justify-content-center">
          <img
            src={`/estore/標題.png`}
            className="indexIcon img-fluid p-2"
            alt="..."
            style={{ width: '20%' }}
          ></img>
        </div>
        <div
          className="row mt-2 pt-5 mb-1 pb-5 px-2 d-flex justify-content-center bg-white"
          style={{ borderRadius: '30px' }}
        >
          {data.success ? (
            getRandomItems(data.rows, 4).map((r, i) => {
              return (
                <div
                  className="col-6 col-lg-4 col-xl-3 my-2"
                  key={r.pk_product_id}
                >
                  <div className={`card ${styles.cardStyle}`}>
                    <a href={`estore/product/${r.pk_product_id}`}>
                      <img
                        src={`http://localhost:3001/estore/A${r.pk_product_id}.png`}
                        className="card-img-top w-100 p-3"
                        alt="..."
                      />
                    </a>
                    <div className="card-body">
                      <h4 className={`card-title ${styles.textStyle}`}>
                        {r.product_name}
                      </h4>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center fs-4">
                          $ {formatCurrency(r.product_price)}
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button
                            className={styles.cart}
                            onClick={(e) => {
                              handleAddItem(e, r)
                              swal.fire(
                                '已加入!',
                                `${r.product_name} 已被加入購物車!`,
                                'success',
                              )
                            }}
                          >
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Loading...</p>
          )}
          <div className="col-3 mt-3 d-flex justify-content-center align-items-center fs-4">
            <button
              className={styles.checkBtn}
              onClick={() => {
                router.push('/estore/')
              }}
            >
              查看更多
            </button>
          </div>
        </div>
      </div>
      <div
        className={`container-fluid d-block d-md-none ${styles.full}`}
        style={{ padding: 30 + 'px' }}
      >
        <div className="row mt-2 pt-2 mb-0 pb-0  d-flex justify-content-center">
          <img
            src={`/estore/標題.png`}
            className="indexIcon img-fluid p-2"
            alt="..."
            style={{ width: '65%' }}
          ></img>
        </div>
        <div
          className="row mt-2 pt-2 mb-1 pb-3 d-flex justify-content-center bg-white"
          style={{ borderRadius: '30px' }}
        >
          {data.success ? (
            getRandomItems(data.rows, 4).map((r, i) => {
              return (
                <div
                  className="col-6 col-lg-4 col-xl-3 my-2"
                  key={r.pk_product_id}
                >
                  <div className={`card ${styles.cardStyle}`}>
                    <a href={`estore/product/${r.pk_product_id}`}>
                      <img
                        src={`http://localhost:3001/estore/A${r.pk_product_id}.png`}
                        className="card-img-top w-100 p-3"
                        alt="..."
                      />
                    </a>
                    <div className="card-body">
                      <h4 className={`card-title ${styles.textStyle}`}>
                        {r.product_name}
                      </h4>
                      <div className="row mt-5 mx-0">
                        <div className="col-8 p-0 d-flex justify-content-start align-items-center fs-4">
                          $ {formatCurrency(r.product_price)}
                        </div>
                        <div className="col-4 p-0 d-flex justify-content-end">
                          <button
                            className={`rounded-circle ${styles.cart}`}
                            onClick={(e) => {
                              handleAddItem(e, r)
                              swal.fire(
                                '已加入!',
                                `${r.product_name} 已被加入購物車!`,
                                'success',
                              )
                            }}
                          >
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Loading...</p>
          )}
          <div className="col-12 mt-3 d-flex justify-content-center align-items-center fs-4">
            <button
              className={styles.checkBtn}
              onClick={() => {
                router.push('/estore/')
              }}
            >
              查看更多
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
