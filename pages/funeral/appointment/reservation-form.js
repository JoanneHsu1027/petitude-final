import { useEffect, useState } from 'react'
import { RV_LIST } from '@/configs/funeral/api-path'
import Layout1 from '@/components/layout/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { RV_ITEM_DELETE } from '@/configs/funeral/api-path'
import { useAuth } from '@/contexts/member/auth-context'

export default function RVList() {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  // const [loading, setLoading] = useState(false);
  // const [loadingError, setLoadingError] = useState('');
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  const removeOne = async (reservation_id) => {
    console.log({ reservation_id })
    if (!auth.id) {
      alert('請登入管理者')
    }

    try {
      const r = await fetch(`${RV_ITEM_DELETE}/${reservation_id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      })

      const result = await r.json()
      console.log(result)
      if (result.success) {
        // 留在原本的頁面, 但是要觸發 router 狀態變更, 讓整個頁面更新
        // router.push(location.search);
        router.push(location.search, undefined, { scroll: false })
      }
    } catch (ex) {}
  }

  useEffect(() => {
    // setLoading(true);
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${RV_LIST}?${new URLSearchParams(router.query)}`, { signal })
      .then((r) => r.json())
      .then((myData) => {
        console.log(data)
        setData(myData)
        // setLoading(false);
      })
      .catch((ex) => {
        // setLoadingError('載入資料時發生錯誤');
        // setLoading(false);
        console.log('fetch-ex:', ex)
      })

    return () => {
      controller.abort() // 取消上一次的 ajax
    }
  }, [router])

  console.log(`reservation-form render--------`)

  if (!router.isReady || !data.success) return null

  return (
    <Layout1 title="線上預約列表" pageName="reservation-form">
      <div className="row">
        <div className="col">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array(11)
                .fill(1)
                .map((v, i) => {
                  const p = data.page - 5 + i
                  if (isNaN(p)) return null
                  if (p < 1 || p > data.totalPages) return null
                  return (
                    <li
                      className={
                        data.page === p ? `page-item active` : `page-item`
                      }
                      key={p}
                    >
                      <Link className="page-link" href={`?page=${p}`}>
                        {p}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>
                  <FaRegTrashCan />
                </th>
                <th>reservation_id</th>
                <th>fk_b2c_id</th>
                <th>reservation_date</th>
                <th>note</th>
                <th>
                  <FaRegPenToSquare />
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) => {
                return (
                  <tr key={r.reservation_id}>
                    <td>
                      <a
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault()
                          removeOne(r.reservation_id)
                        }}
                      >
                        <FaRegTrashCan />
                      </a>
                    </td>
                    <td>{r.reservation_id}</td>
                    <td>{r.fk_b2c_id}</td>
                    <td>{r.reservation_date}</td>
                    <td>{r.note}</td>
                    <td>
                      <Link href={`/reservation-edit/${r.reservation_id}`}>
                        <FaRegPenToSquare />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout1>
  )
}
