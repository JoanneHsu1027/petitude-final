import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/member/auth-context'
import { API_SERVER, MEMBER_UPDATE_POST } from '@/configs/api-path'
import Layout from '@/components/layout/layout'
import MemberProfileForm from '@/components/member/MemberProfileForm'

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
    <Layout>
      <div>
        {/* 加入會員資料表單 */}
        <MemberProfileForm memberData={memberData} />
      </div>
    </Layout>
  )
}

export default Member
