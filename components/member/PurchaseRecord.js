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

  return (
    <div className="p-4">
      <div className={recordstyles['record-group']}>
        <button
          className={activeRecordType === 'insurance' ? 'active' : ''}
          onClick={() => setActiveRecordType('insurance')}
        >
          保險紀錄
        </button>
        <button
          className={activeRecordType === 'lifeCeremony' ? 'active' : ''}
          onClick={() => setActiveRecordType('lifeCeremony')}
        >
          生命典禮紀錄
        </button>
        <button
          className={activeRecordType === 'product' ? 'active' : ''}
          onClick={() => setActiveRecordType('product')}
        >
          產品購買紀錄
        </button>
      </div>
      {activeRecordType === 'insurance' && (
        <>
          <h3>保險紀錄</h3>
          <InsuranceRecords records={records} />
        </>
      )}
      {activeRecordType === 'lifeCeremony' && (
        <>
          <h3>生命典禮紀錄</h3>
          <LifeCeremonyRecords records={records} />
        </>
      )}
      {activeRecordType === 'product' && (
        <>
          <h3>產品購買紀錄</h3>
          <ProductRecords records={records} />
        </>
      )}
    </div>
  )
}

export default PurchaseHistory
