import React from 'react'
import Layout from '@/components/layout/layout'
import Funeral from '@/components/funeral/homeFuneral'
import InsuranceSection from '@/components/insurance/insurance-section'

export default function home() {
  return (
    <>
      <Layout>
        <InsuranceSection />
        <Funeral />
      </Layout>
    </>
  )
}
