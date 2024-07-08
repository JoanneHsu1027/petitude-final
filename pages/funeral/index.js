import React from 'react'
import Layout1 from '@/component/layout/layout1'
import Head from 'next/head'

export default function Home() {
  return (
    <Layout1 title="首頁" pageName="home">
      <Head>
        <meta keyword="angela" />
      </Head>
      <h1>Home</h1>
    </Layout1>
  )
}
