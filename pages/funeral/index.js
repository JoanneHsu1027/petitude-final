import React from 'react'
import Layout from '../../components/layout/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <Layout title="首頁" pageName="home">
      <Head>
        <meta keyword="angela" />
      </Head>
      <h1>Home</h1>
    </Layout>
  )
}
