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
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedDay, setSelectedDay] = useState('')

  useEffect(() => {
    const yearsArray = [
      { value: '', label: '請選擇' },
      ...Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
        value: startYear + i,
        label: startYear + i,
      })),
    ]
    setYears(yearsArray)
  }, [startYear, endYear])

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const monthsArray = [
      { value: '', label: '請選擇' },
      ...Array.from({ length: 12 }, (_, i) => {
        const month = i + 1
        if (
          (disableFuture &&
            selectedYear === currentYear &&
            month > currentMonth) ||
          (disablePast && selectedYear === currentYear && month < currentMonth)
        ) {
          return null
        }
        return { value: month, label: month }
      }).filter(Boolean),
    ]
    setMonths(monthsArray)
  }, [selectedYear, disableFuture, disablePast])

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDay = new Date().getDate()

    const daysInMonth = selectedMonth
      ? new Date(selectedYear, selectedMonth, 0).getDate()
      : 31
    const daysArray = [
      { value: '', label: '請選擇' },
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        if (
          (disableFuture &&
            selectedYear === currentYear &&
            selectedMonth === currentMonth &&
            day > currentDay) ||
          (disablePast &&
            selectedYear === currentYear &&
            selectedMonth === currentMonth &&
            day < currentDay)
        ) {
          return null
        }
        return { value: day, label: day }
      }).filter(Boolean),
    ]
    setDays(daysArray)
  }, [selectedYear, selectedMonth, disableFuture, disablePast])

  const handleYearChange = (e) => {
    const value = e.target.value
    setSelectedYear(value ? parseInt(value) : '')
    setSelectedMonth('')
    setSelectedDay('')
  }

  const handleMonthChange = (e) => {
    const value = e.target.value
    setSelectedMonth(value ? parseInt(value) : '')
    setSelectedDay(1)
  }

  const handleDayChange = (e) => {
    const value = e.target.value
    setSelectedDay(value ? parseInt(value) : '')
  }

  useEffect(() => {
    if (onChange && selectedYear && selectedMonth && selectedDay) {
      onChange({ year: selectedYear, month: selectedMonth, day: selectedDay })
    }
  }, [selectedYear, selectedMonth, selectedDay, onChange])

  return (
    <form className="d-flex justify-content-center" name="datePicker">
      <div className="form-group d-flex align-items-center">
        <select
          className={`form-control ${styles['own-btn3']}`}
          value={selectedYear}
          onChange={handleYearChange}
          required
        >
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
        <label htmlFor="year">
          <p className="mx-2 my-2">年</p>
        </label>
      </div>
      <div className="form-group d-flex align-items-center">
        <select
          className={`form-control ${styles['own-btn3']}`}
          value={selectedMonth}
          onChange={handleMonthChange}
          required
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <label htmlFor="month">
          <p className="mx-2 my-2">月</p>
        </label>
      </div>
      <div className="form-group d-flex align-items-center">
        <select
          className={`form-control ${styles['own-btn3']}`}
          value={selectedDay}
          onChange={handleDayChange}
          required
        >
          {days.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
        <label htmlFor="day">
          <p className="mx-2 my-2">日</p>
        </label>
      </div>
    </form>
  )
}
