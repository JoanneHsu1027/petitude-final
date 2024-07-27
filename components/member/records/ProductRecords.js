//生命禮儀紀錄

import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/member/auth-context'
// import { BOOKING_GET_ITEM } from '@/configs/funeral/api-path'

export default function ProductRecords() {
  const router = useRouter()
  const { auth } = useAuth()
  const [data, setData] = useState([])
  const [latestReservation, setLatestReservation] = useState(null)
  const [latestBooking, setLatestBooking] = useState(null)

  const stateMapping = {
    0: '未付款',
    1: '已付款',
  }
  const projectName = {
    1: '溫馨寵物 -個別羽化',
    2: '尊榮寵物 - 個別羽化',
    3: '朋友寵物 -集體羽化',
  }

  useEffect(() => {
    // 購買紀錄
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reservation`)
        console.log('Response status:', response.status)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        console.log('Received reservation data:', data)
        if (data && data.rows && Array.isArray(data.rows)) {
          const sortedReservation = data.rows.sort(
            (a, b) => b.reservation_id - a.reservation_id,
          )
          setLatestReservation(sortedReservation[0])
          console.log(
            'Sorted and set latest reservation:',
            sortedReservation[0],
          )
        } else {
          console.error('Invalid data structure for reservation:', data)
        }
      } catch (error) {
        console.error('Error fetching reservation:', error)
      }
    }
    // 契約購買紀錄
    const fetchBookingData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/booking`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        if (data.success && data.rows && data.rows.length > 0) {
          const sortedBookings = data.rows.sort(
            (a, b) => b.booking_id - a.booking_id,
          )
          const latestBookingData = sortedBookings[0]
          latestBookingData.booking_state =
            stateMapping[latestBookingData.booking_state]
          latestBookingData.fk_project_id =
            projectName[latestBookingData.fk_project_id]
          setLatestBooking(latestBookingData)
        } else {
          console.error('No booking data found')
        }
      } catch (error) {
        console.error('Error fetching booking:', error)
      }
    }

    fetchReservation()
    fetchBookingData()

    const intervalId = setInterval(() => {
      fetchReservation()
      fetchBookingData()
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="container my-5">
      <div className="row">
        <h2>預約/ 訂單紀錄</h2>
        {/* 預約 */}
        <div className="col-12 justify-content-center align-items-center mb-3 mt-3">
          {/* <!-- 線上預約紀錄 --> */}
          <div
            className="card my-3"
            style={{
              maxWidth: '100%',
              height: 'auto',
              marginTop: '0.3rem',
              borderTopRightRadius: '30px',
              borderTopLeftRadius: '30px',
              marginBottom: '0',
            }}
          >
            <div
              className="card-header text-center"
              style={{
                backgroundColor: '#F6D554',
                color: '#ffffff',
                borderTopRightRadius: '30px',
                borderTopLeftRadius: '30px',
              }}
            >
              購買紀錄
            </div>
            <div className="card-body">
              <div className="row no-border-table">
                <div className="col-12 col-md-6">
                  <table>
                    <tbody>
                      <tr>
                        <th>訂單編號: </th>
                        <td>{latestReservation?.reservation_id}</td>
                      </tr>
                      <tr>
                        <th>訂單狀態: </th>
                        <td>
                          {new Date(
                            latestReservation?.reservation_date,
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-12 col-md-6">
                  <table>
                    <tbody>
                      <tr>
                        <th>訂單細項: </th>
                        <td>
                          <button>點擊查看</button>
                        </td>
                      </tr>
                      <tr>
                        <th>訂單金額: </th>
                        <td>{latestReservation?.note}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-header,
        .card-body,
        .form-check-label,
        .form-label,
        .form-control,
        .form-select {
          font-size: 1.2rem;
        }

        .form-control {
          flex-grow: 1;
        }

        th,
        td {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .container,
          .row,
          .leftCard,
          .rightCard {
            width: 100%;
            margin: 0 auto;
          }
          th,
          td {
            font-size: 0.9rem;
          }
        }

        .card-header,
        .card-title {
          font-size: 1.2rem;
        }

        .form-check-label,
        .form-label,
        .form-control,
        .form-select {
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}
