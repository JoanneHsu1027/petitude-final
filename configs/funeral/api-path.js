// 生命禮儀

export const API_SERVER = 'http://localhost:3001'

//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// project(契約)
// (串前端project/card的api)
export const PJ_LIST = `${API_SERVER}/project`
// export const PJ_ADD_POST = `${API_SERVER}/project/add`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: DELETE
// export const PJ_ITEM_DELETE = `${API_SERVER}/project/api`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: GET, 取得單筆資料
export const PJ_GET_ITEM = `${API_SERVER}/project/api`

// // `${API_SERVER}/reservation/api/${reservation_id}`, method: PUT, 修改單筆資料
// export const PJ_UPDATE_PUT = `${API_SERVER}/project/api`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// reservation(預約)
// (串前端reservation-form的api)
export const RV_LIST = `${API_SERVER}/reservation/api`
export const RV_ADD_POST = `${API_SERVER}/reservation/add`

// `${API_SERVER}/reservation/api/${reservation_id}`, method: DELETE
export const RV_ITEM_DELETE = `${API_SERVER}/reservation/api`

// `${API_SERVER}/reservation/api/${reservation_id}`, method: GET, 取得單筆資料
export const RV_GET_ITEM = `${API_SERVER}/reservation/api`

// `${API_SERVER}/reservation/api/${reservation_id}`, method: PUT, 修改單筆資料
export const RV_UPDATE_PUT = `${API_SERVER}/reservation/api`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// 登入, 表單資料 {email, password}
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Booking(訂購)
export const BOOKING_LIST = `${API_SERVER}/booking/api`
// export const BOOKING_ADD_POST = `${API_SERVER}/booking/add`

// `${API_SERVER}/booking/api/${booking_id}`, method: DELETE
// export const BOOKING_ITEM_DELETE = `${API_SERVER}/booking/api`

// `${API_SERVER}/booking/api/${booking_id}`, method: GET, 取得單筆資料
export const BOOKING_GET_ITEM = `${API_SERVER}/booking/api`

// `${API_SERVER}/booking/api/${booking_id}`, method: PUT, 修改單筆資料
// export const BOOKING_UPDATE_PUT = `${API_SERVER}/booking/api`
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
export const RL = `${API_SERVER}/project/cartCheckout1`
