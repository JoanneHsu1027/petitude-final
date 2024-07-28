export const API_SERVER = 'http://localhost:3001'

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// 登入, 表單資料 {email, password}
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

// 註冊, 表單資料 {email, password}
export const MEMBER_ADD_POST = `${API_SERVER}/b2c_member/add`

//修改，表單資料
export const MEMBER_UPDATE_POST = `${API_SERVER}/b2c_member/api`

// 頭像上傳，表單資料
export const MEMBER_AVATAR_UPDATE_POST = `${API_SERVER}/b2c_member/avatar`

//密碼重設
export const MEMBER_FORGETPASSWORD_POST = `${API_SERVER}/b2c_member/request-password-reset`

//驗證碼收發
export const VERIFY_RESET_CODE_POST = `${API_SERVER}/b2c_member/verify-reset-code`

//設定密碼
export const RESET_PASSWORD_POST = `${API_SERVER}/b2c_member/reset-password`

//保險紀錄
export const InsuranceRecords_GET = `${API_SERVER}/b2c_member/insurancerecords`

//商品紀錄
export const ProductRecords_GET = `${API_SERVER}/b2c_member/productrecords`

//商品細項取得
export const ProductRecords_Detail_GET = `${API_SERVER}/b2c_member/productrecords_detail`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Booking(訂購)
// export const BOOKING_LIST = `${API_SERVER}/booking/api`
// export const BOOKING_ADD_POST = `${API_SERVER}/booking/add`

// // `${API_SERVER}/booking/api/${booking_id}`, method: DELETE
// export const BOOKING_ITEM_DELETE = `${API_SERVER}/booking/api`

// // `${API_SERVER}/booking/api/${booking_id}`, method: GET, 取得單筆資料
// export const BOOKING_GET_ITEM = `${API_SERVER}/booking/api`

// // `${API_SERVER}/booking/api/${booking_id}`, method: PUT, 修改單筆資料
// export const BOOKING_UPDATE_PUT = `${API_SERVER}/booking/api`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// reservation(預約)
// (串前端reservation-form的api)
export const PJ_LIST = `${API_SERVER}/project/api`
// export const PJ_ADD_POST = `${API_SERVER}/reservation/add`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: DELETE
// export const PJ_ITEM_DELETE = `${API_SERVER}/reservation/api`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: GET, 取得單筆資料
// export const PJ_GET_ITEM = `${API_SERVER}/reservation/api`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: PUT, 修改單筆資料
// export const PJ_UPDATE_PUT = `${API_SERVER}/reservation/api`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// reservation(預約)
// (串前端reservation-form的api)
export const RV_LIST = `${API_SERVER}/reservation/api`
// export const RV_ADD_POST = `${API_SERVER}/reservation/add`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: DELETE
// export const RV_ITEM_DELETE = `${API_SERVER}/reservation/api`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: GET, 取得單筆資料
// export const RV_GET_ITEM = `${API_SERVER}/reservation/api`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: PUT, 修改單筆資料
// export const RV_UPDATE_PUT = `${API_SERVER}/reservation/api`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
