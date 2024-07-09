export const API_SERVER = 'http://localhost:3001'

// 登入, 表單資料 {b2c_email, b2c_password}
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

export const AB_LIST = `${API_SERVER}/address-book/api`

export const AB_ADD_POST = `${API_SERVER}/address-book/add`

// `${API_SERVER}/address-book/api/${sid}`, method: DELETE
export const AB_ITEM_DELETE = `${API_SERVER}/address-book/api`

// `${API_SERVER}/address-book/api/${sid}`, method: GET, 取得單筆資料
export const AB_GET_ITEM = `${API_SERVER}/address-book/api`

// `${API_SERVER}/address-book/api/${sid}`, method: PUT, 修改單筆資料
export const AB_UPDATE_PUT = `${API_SERVER}/address-book/api`
