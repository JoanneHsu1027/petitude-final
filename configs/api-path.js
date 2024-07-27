export const API_SERVER = 'http://localhost:3001'

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export const MEMBER_ADD_POST = `${API_SERVER}/b2c_member/add`

export const MEMBER_UPDATE_POST = `${API_SERVER}/b2c_member/api`

export const MEMBER_FORGETPASSWORD_POST = `${API_SERVER}/b2c_member/request-password-reset`

export const VERIFY_RESET_CODE_POST = `${API_SERVER}/b2c_member/verify-reset-code`

export const RESET_PASSWORD_POST = `${API_SERVER}/b2c_member/reset-password`

export const InsuranceRecords_GET = `${API_SERVER}/b2c_member/insurancerecords`

export const getUploadAvatarUrl = (b2c_id) =>
  `${API_SERVER}/b2c_member/${b2c_id}/avatar`

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
