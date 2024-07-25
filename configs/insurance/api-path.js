export const API_SERVER = 'http://localhost:3001'

//add order
export const INSURANCE_ADD_POST = `${API_SERVER}/insurance/save-insurance-order`

// read order, method: GET, 取得單筆資料
export const INSURANCE_GET_ITEM = `${API_SERVER}/insurance/read-insurance-order`

// read b2c_member, method: GET, 取得會員資料
export const INSURANCE_GET_B2C = `${API_SERVER}/b2c_member/api`
