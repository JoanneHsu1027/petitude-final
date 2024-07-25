import React from 'react'
import Layout from '@/components/layout/layout'
import Funeral from '@/components/funeral/homeFuneral'
import InsuranceSection from '@/components/insurance/insurance-section'

import Estore from '@/components/estore/indexPage'
export default function home() {
  return (
    <>
      <Layout>
        <Estore />
        <InsuranceSection />
        <Funeral />
      </Layout>
    </>
  )
}
