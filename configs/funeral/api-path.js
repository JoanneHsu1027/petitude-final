// 生命禮儀

export const API_SERVER = 'http://localhost:3001'

//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// project(契約)
// (串前端project/card的api)
export const PJ_LIST = `${API_SERVER}/project`
export const PJ_GET_ITEM = `${API_SERVER}/project/api`



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// reservation(預約)
// (串前端reservation-form的api)
export const RV_LIST = `${API_SERVER}/reservation/api`
export const RV_ADD_POST = `${API_SERVER}/reservation/add`

export const RV_ITEM_DELETE = `${API_SERVER}/reservation/api`

export const RV_GET_ITEM = `${API_SERVER}/reservation/api`

export const RV_UPDATE_PUT = `${API_SERVER}/reservation/api`

// export const RV_RESERVETIONRECORTS = `${API_SERVER}/b2c_member//reservationrecords`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Booking(訂購)
// (串前端booking的api)
export const BOOKING_LIST = `${API_SERVER}/booking/api`
export const BOOKING_GET_ITEM = `${API_SERVER}/booking/api`
// export const BK_BOOKINGRECORTS = `${API_SERVER}/b2c_member//bookingrecords`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
export const RL = `${API_SERVER}/project/cartCheckout1`

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 登入, 表單資料 {email, password}
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

