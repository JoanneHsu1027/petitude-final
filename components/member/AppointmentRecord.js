//預約紀錄

import React, { useEffect, useState } from 'react'

const AppointmentRecord = ({ memberData, onEdit }) => {
  useEffect(() => {}, [memberData])

  return (
    <div className="p-4">
      <h3 className="mb-4">預約紀錄</h3>
    </div>
  )
}

export default AppointmentRecord
