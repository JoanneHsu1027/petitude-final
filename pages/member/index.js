// pages/member/index.js
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/member/auth-context'
import { API_SERVER } from '@/configs/api-path'
import Layout from '@/components/layout/layout'
import MemberProfileForm from '@/components/member/MemberProfileForm'
import MemberProfileView from '@/components/member/MemberProfileView'
import styles from './css/MemberProfile.module.css' // 使用組件級別的 CSS Modules

const Member = () => {
  const { auth, getAuthHeader } = useAuth()
  const [memberData, setMemberData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

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
      <div className={styles['container']}>
        <div className={styles['form-body']}>
          {isEditing ? (
            <MemberProfileForm
              memberData={memberData}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <MemberProfileView
              memberData={memberData}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Member
