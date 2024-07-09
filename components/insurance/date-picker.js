import React, { useEffect, useState } from 'react'
import styles from '@/components/insurance/insurance.module.css'

export default function DatePicker({
  startYear,
  endYear,
  disableFuture,
  disablePast,
  onChange,
}) {
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])
  const [days, setDays] = useState([])
  const [selectedYear, setSelectedYear] = useState(startYear)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())

  useEffect(() => {
    const yearsArray = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i,
    )
    setYears(yearsArray)
  }, [startYear, endYear])

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const monthsArray = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1
      return {
        value: month,
        disabled:
          (disableFuture &&
            selectedYear === currentYear &&
            month > currentMonth) ||
          (disablePast && selectedYear === currentYear && month < currentMonth), // 添加這個條件
      }
    })
    setMonths(monthsArray)
  }, [selectedYear, disableFuture, disablePast]) // 添加 disablePast 到依賴數組

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDay = new Date().getDate()

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      return {
        value: day,
        disabled:
          (disableFuture &&
            selectedYear === currentYear &&
            selectedMonth === currentMonth &&
            day > currentDay) ||
          (disablePast &&
            selectedYear === currentYear &&
            selectedMonth === currentMonth &&
            day < currentDay), // 添加這個條件
      }
    })
    setDays(daysArray)
  }, [selectedYear, selectedMonth, disableFuture, disablePast]) // 添加 disablePast 到依賴數組

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value))
    setSelectedMonth(1)
    setSelectedDay(1)
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value))
    setSelectedDay(1)
  }

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value))
  }

  useEffect(() => {
    if (onChange) {
      onChange({ year: selectedYear, month: selectedMonth, day: selectedDay })
    }
  }, [selectedYear, selectedMonth, selectedDay])

  return (
    <form className="d-flex" name="datePicker">
      <div className="form-group d-flex align-items-center">
        <select
          className={`form-control ${styles['own-btn3']}`}
          style={{ width: 176, height: 66 }}
          value={selectedYear}
          onChange={handleYearChange}
          required
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="year">
          <h2 className="mx-2">年</h2>
        </label>
      </div>
      <div className="form-group d-flex align-items-center">
        <select
          className={`form-control ${styles['own-btn3']}`}
          style={{ width: 176, height: 66 }}
          value={selectedMonth}
          onChange={handleMonthChange}
          required
        >
          {months.map((month) => (
            <option
              key={month.value}
              value={month.value}
              disabled={month.disabled}
            >
              {month.value}
            </option>
          ))}
        </select>
        <label htmlFor="month">
          <h2 className="mx-2">月</h2>
        </label>
      </div>
      <div className="form-group d-flex align-items-center">
        <select
          className={`form-control ${styles['own-btn3']}`}
          style={{ width: 176, height: 66 }}
          value={selectedDay}
          onChange={handleDayChange}
          required
        >
          {days.map((day) => (
            <option key={day.value} value={day.value} disabled={day.disabled}>
              {day.value}
            </option>
          ))}
        </select>
        <label htmlFor="day">
          <h2 className="mx-2">日</h2>
        </label>
      </div>
    </form>
  )
}
