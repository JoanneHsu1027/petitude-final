import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/member/auth-context'
import {
  MEMBER_UPDATE_POST,
  MEMBER_AVATAR_UPDATE_POST,
} from '@/configs/api-path'
import Layout from '@/components/layout/layout'
import MemberProfileForm from '@/components/member/MemberProfileForm'
import MemberProfileView from '@/components/member/MemberProfileView'
import PurchaseRecord from '@/components/member/PurchaseRecord'
import FavoriteProduct from '@/components/member/FavoriteProduct'
import styles from '@/styles/member/MemberProfile.module.css'

const Member = () => {
  const { auth, getAuthHeader, updateUser } = useAuth()
  const [memberData, setMemberData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!auth.b2c_id) return

      try {
        const response = await fetch(`${MEMBER_UPDATE_POST}/${auth.b2c_id}`, {
          headers: getAuthHeader(),
        })
        const result = await response.json()
        if (result.success) {
          setMemberData(result.data)
          setAvatarPreview(result.data.b2c_avatar) // 設置大頭貼預覽
        } else {
          console.error(result.error)
          setError(result.error)
        }
      } catch (ex) {
        console.error(ex)
        setError('無法加載會員資料')
      }
    }

    fetchMemberData()
  }, [auth.b2c_id, getAuthHeader])

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result

      try {
        const response = await fetch(`${MEMBER_AVATAR_UPDATE_POST}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            b2c_id: auth.b2c_id,
            b2c_avatar: base64String,
          }),
        })

        const result = await response.json()
        if (result.success) {
          setAvatarPreview(base64String) // 更新預覽圖
          updateUser({ b2c_avatar: result.data }) // 更新 context 中的 avatar
        } else {
          console.error('大頭貼上傳失敗:', result.error)
          setError(result.error)
        }
      } catch (ex) {
        console.error('上傳錯誤:', ex)
        setError('上傳大頭貼時發生錯誤')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarClick = () => {
    document.getElementById('avatar-input').click()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleAvatarClick()
    }
  }

  if (!auth.b2c_id) {
    return <p>請先登入</p>
  }

  if (!memberData) {
    return <p>載入中...</p>
  }

  return (
    <Layout>
      <div className={styles['container']}>
        <div className={styles['switch-layout']}>
          <button
            className={
              activeTab === 'profile'
                ? styles['switch-button-active']
                : styles['switch-button']
            }
            onClick={() => setActiveTab('profile')}
          >
            會員資料
          </button>
          <button
            className={
              activeTab === 'purchase'
                ? styles['switch-button-active']
                : styles['switch-button']
            }
            onClick={() => setActiveTab('purchase')}
          >
            購物紀錄
          </button>

          <button
            className={
              activeTab === 'favorite'
                ? styles['switch-button-active']
                : styles['switch-button']
            }
            onClick={() => setActiveTab('favorite')}
          >
            收藏商品
          </button>
        </div>
        {activeTab === 'profile' && (
          <>
            <div
              className={styles['avatar-container']}
              onClick={handleAvatarClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex="0"
              aria-label="點擊以更改大頭貼"
            >
              {avatarPreview ? (
                <img
                  className={styles['avatar-container']}
                  src={avatarPreview}
                  alt="會員大頭貼"
                />
              ) : (
                <p>沒有大頭貼</p>
              )}
              <input
                id="avatar-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </div>
            {error && <p className={styles['error']}>{error}</p>}
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
          </>
        )}
        {activeTab === 'purchase' && <PurchaseRecord />}
        {activeTab === 'favorite' && <FavoriteProduct />}
      </div>
    </Layout>
  )
}

export default Member
