import React from 'react'
import Layout from '@/components/layout/layout'
import Funeral from '@/components/funeral/homeFuneral'
import Estore from '@/components/estore/indexPage'
export default function home() {
  return (
    <>
      <Layout>
        <Estore />
        <Funeral />
      </Layout>
    </>
  )
}
