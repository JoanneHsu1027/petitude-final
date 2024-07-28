import React, { useEffect, useState } from 'react'
import InsuranceRecords from '@/components/member/records/InsuranceRecords'
import LifeCeremonyRecords from '@/components/member/records/LifeCeremonyRecords'
import ProductRecords from '@/components/member/records/ProductRecords'
import recordstyles from '@/styles/member/PurchaseRecord.module.css'

const PurchaseHistory = ({ memberData }) => {
  const [activeRecordType, setActiveRecordType] = useState('insurance')
  const [records, setRecords] = useState([])

  useEffect(() => {
    if (memberData) {
      switch (activeRecordType) {
        case 'insurance':
          setRecords(memberData.insuranceRecords || [])
          break
        case 'lifeCeremony':
          setRecords(memberData.lifeCeremonyRecords || [])
          break
        case 'product':
          setRecords(memberData.productRecords || [])
          break
        default:
          setRecords([])
          break
      }
    }
  }, [memberData, activeRecordType])

  const renderRecordTypeButton = (type, label) => (
    <button
      className={`${recordstyles['record-button']} ${activeRecordType === type ? recordstyles['record-button-active'] : ''}`}
      onClick={() => setActiveRecordType(type)}
    >
      {label}
    </button>
  )

  return (
    <div style={{ width: '100%' }}>
      <div className={recordstyles['record-group']}>
        {renderRecordTypeButton('insurance', '保險紀錄')}
        {renderRecordTypeButton('lifeCeremony', '禮儀紀錄')}
        {renderRecordTypeButton('product', '產品紀錄')}
      </div>
      <div className={recordstyles['record-title']}>
        {activeRecordType === 'insurance' && (
          <>
            <h3>保險紀錄</h3>
            {records.length > 0 ? (
              <InsuranceRecords records={records} />
            ) : (
              <p>沒有保險紀錄</p>
            )}
          </>
        )}
        {activeRecordType === 'lifeCeremony' && (
          <>
            <h3>生命禮儀紀錄</h3>
            {records.length > 0 ? (
              <LifeCeremonyRecords records={records} />
            ) : (
              <p>沒有生命禮儀紀錄</p>
            )}
          </>
        )}
        {activeRecordType === 'product' && (
          <>
            <h3>產品購買紀錄</h3>
            {records.length > 0 ? (
              <ProductRecords records={records} />
            ) : (
              <p>沒有產品購買紀錄</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PurchaseHistory
