import React, { useState, useEffect } from 'react'
import Layout3 from '@/components/layout/layout3'
import Carousel from '@/components/carousel'
import CheckboxList from '@/components/lessons/checkboxList'
import styles from '@/styles/lesson.module.css'
import { IoSearch } from 'react-icons/io5'
import LessonList from '@/components/lessons/lessonList'
import axios from 'axios'
import { useCallback } from 'react'
import Link from 'next/link'

export default function Index() {
  // 用於存儲所有課程的狀態
  const [allLessons, setAllLessons] = useState([])
  // 用於存儲篩選後的課程的狀態
  const [filteredLessons, setFilteredLessons] = useState([])
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
      const newFilteredLessons = allLessons.filter(
        (lesson) =>
          newSelectedCategories.length === 0 ||
          newSelectedCategories.includes(lesson.categories),
      )
      console.log('Filtered lessons:', newFilteredLessons)
      setFilteredLessons(newFilteredLessons)

      return newSelectedCategories
    })
  }

  const fetchLessons = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/lessons/api`, {
        params: {
          code_desc: selectedCategories.join('-'),
          keyword: searchKeyword,
        },
      })
      console.log('API response:', response.data)
      if (response.data.success) {
        setAllLessons(response.data.rows)
        setFilteredLessons(response.data.rows)
      }
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }, [selectedCategories, searchKeyword])

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchLessons()
  }

  // const handleCategoryChange = (code_desc, isChecked) => {
  //   setSelectedCategories((prev) => {
  //     if (isChecked) {
  //       return [...prev, code_desc]
  //     } else {
  //       return prev.filter((cat) => cat !== code_desc)
  //     }
  //   })
  // }

  // 在組件加載時獲取所有課程

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/lessons/api${
            selectedCategories.length > 0
              ? `?code_desc=${selectedCategories.join('-')}`
              : ''
          }`,
        )
        console.log('API response:', response.data)
        if (response.data.success) {
          setAllLessons(response.data.rows)
          setFilteredLessons(response.data.rows)
        }
      } catch (error) {
        console.error('Error fetching lessons:', error)
      }
    }

    fetchLessons()
  }, [selectedCategories, fetchLessons])

  return (
    <>
      <Layout3 title="課程列表" pageName="lessons">
        <div className={styles.content}>
          <div className={styles.popularCard}>
            <section className="popular lessons">
              <div className="row">
                <Carousel carouselTitle="熱門課程" />
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-lg btn-primary text-white h4-font rounded-pill">
                    找課程
                  </button>
                </div>
              </div>
            </section>
          </div>{' '}
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <IoSearch />
            </div>
            <input
              type="text"
              name="search_input"
              className={styles.search_input}
              placeholder="請輸入關鍵字搜尋..."
              value={searchKeyword}
              onChange={handleSearchInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSearchSubmit(e)
                }
              }}
            />
          </div>
          <div className={styles.filter}>
            <p className={styles.select}>請選擇類別 ｜</p>
            <div className={styles.checkboxWrapper}>
              <CheckboxList
                checked={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
          <div className={styles.result}>
            <p className={styles.result_title}>篩選結果</p>
            <LessonList lessons={filteredLessons} />
          </div>
        </div>
      </Layout3>
    </>
  )
}
