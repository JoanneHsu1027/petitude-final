export const API_SERVER = 'http://localhost:3001'

//add order, method: POST, 新增單筆資料
export const INSURANCE_ADD_POST = `${API_SERVER}/insurance/save-insurance-order`

// read order, method: GET, 取得單筆資料
export const INSURANCE_GET_ITEM = `${API_SERVER}/insurance/read-insurance-order`

// update order, method: PUT, 更新保單資料
export const INSURANCE_EDIT_ITEM = `${API_SERVER}/insurance/update-insurance-order`

// update order, method: DELETE, 更新保單資料
export const INSURANCE_DELETE_ITEM = `${API_SERVER}/insurance/delete-insurance-order`

// read b2c_member, method: GET, 取得會員資料
export const INSURANCE_GET_B2C = `${API_SERVER}/b2c_member/api`
