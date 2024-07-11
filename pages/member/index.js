import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/member/auth-context'
import { API_SERVER } from '@/configs/api-path'
import Layout1 from '@/components/layout/layout'

const Member = () => {
  const { auth, getAuthHeader } = useAuth()
  const [memberData, setMemberData] = useState(null)

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!auth.b2c_id) return // 確保有 b2c_id 才發送請求
      try {
        const response = await fetch(
          `${API_SERVER}/b2c_member/api/${auth.b2c_id}`,
          {
            headers: getAuthHeader(),
          },
        )
        const result = await response.json()
        if (result.success) {
          setMemberData(result.data)
        } else {
          console.error(result.error)
        }
      } catch (ex) {
        console.error(ex)
      }
    }

    fetchMemberData()
  }, [auth.b2c_id, getAuthHeader])

  if (!auth.b2c_id) {
    return <p>請先進行登入</p>
  }

  if (!memberData) {
    return <p>載入中...</p>
  }

  return (
    <Layout1>
      <div>
        <h1>會員資料</h1>
        <p>
          <strong>會員名稱:</strong> {memberData.b2c_name}
        </p>
        <p>
          <strong>會員信箱:</strong> {memberData.b2c_email}
        </p>
        <p>
          <strong>會員手機:</strong> {memberData.b2c_mobile}
        </p>
        {/* 添加更多需要顯示的欄位 */}
      </div>
    </Layout1>
  )
}

export default Member
