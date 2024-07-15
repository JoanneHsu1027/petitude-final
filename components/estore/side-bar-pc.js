import React, { useState, useEffect, useCallback } from 'react'
import styles from '@/styles/estore/side-bar-style.module.css'
import { BsFillTriangleFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ProductList } from '@/configs/estore/api-path'

export default function SideBarPc() {
  // 用於存儲所有課程的狀態
  const [allProducts, setAllProducts] = useState([])
  // 用於存儲篩選後的課程的狀態
  const [filteredProducts, setFilteredProducts] = useState([])
  // 用於存儲選中的類別的狀態
  const [selectedCategories, setSelectedCategories] = useState([])
  //用來儲存關鍵字的狀態
  const [searchKeyword, setSearchKeyword] = useState('')

  // 處理類別選擇變化的函數(使用checkbox進行篩選)
  const handleCategoryChange = (code_desc, isChecked) => {
    console.log('handleCategoryChange called:', code_desc, isChecked)
    setSelectedCategories((prev) => {
      // 如果有選擇類別，就加入陣就加入陣列，沒有就移除
      const newSelectedCategories = isChecked
        ? [...prev, code_desc]
        : prev.filter((cat) => cat !== code_desc)

      console.log('New selected categories:', newSelectedCategories)

      // 只顯示選擇類別的課程
      const newFilteredProducts = allProducts.filter(
        (lesson) =>
          newSelectedCategories.length === 0 ||
          newSelectedCategories.includes(lesson.categories),
      )
      console.log('Filtered Products:', newFilteredProducts)
      setFilteredProducts(newFilteredProducts)

      return newSelectedCategories
    })
  }

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/product/api`, {
        params: {
          code_desc: selectedCategories.join('-'),
          keyword: searchKeyword,
        },
      })
      console.log('API response:', response.data)
      if (response.data.success) {
        setAllProducts(response.data.rows)
        setFilteredProducts(response.data.rows)
      }
    } catch (error) {
      console.error('Error fetching Products:', error)
    }
  }, [selectedCategories, searchKeyword])

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:3001/products/api${
    //         selectedCategories.length > 0
    //           ? `?code_desc=${selectedCategories.join('-')}`
    //           : ''
    //       }`,
    //     )
    //     console.log('API response:', response.data)
    //     if (response.data.success) {
    //       setAllProducts(response.data.rows)
    //       setFilteredProducts(response.data.rows)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching Products:', error)
    //   }
    // }

    fetchProducts()
  }, [fetchProducts])

  return (
    <>
      <div className="col-md-3 d-md-flex d-none my-4 justify-content-center">
        <div
          className={`bg-white ${styles.Rounded5} ${styles.H70} px-3 pt-4 d-flex flex-column justify-content-between`}
          style={{ width: 'auto' }}
        >
          <div className="d-flex flex-column">
            <form className="d-flex mb-5" onSubmit={handleSearchSubmit}>
              <input
                className={`${styles.BorderEndDel} form-control border-success border-end-0`}
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="keyword"
                value={searchKeyword}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSearchSubmit(e)
                  }
                }}
              />
              <button
                className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
                type="button"
                onClick={handleSearchSubmit}
              >
                <BsSearch />
              </button>
            </form>
            <Link
              href="../../platform/class-list"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
              placeholder="請輸入關鍵字搜尋..."
              value={searchKeyword}
              onChange={handleSearchInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSearchSubmit(e)
                }
              }}
            >
              主題分類
            </Link>
            <Link
              href=""
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              熱門討論
            </Link>
            <Link
              href="../../platform/article-list"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              最新文章
            </Link>
            <Link
              href=""
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              文章收藏
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Link
              className={`${styles.AReset} ${styles.GoTopBtn} mb-2`}
              href="#"
            >
              Go Top <BsFillTriangleFill />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
