import React from 'react'
import Navbar from './navbar'
import Head from 'next/head'
import Footer from './footer'

export default function Layout({ children, title = '', pageName = '' }) {
  return (
    <>
      {/* footer置底用div */}
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Head>
          <title>{title ? title + ' | Petitude' : 'Petitude'}</title>
        </Head>
        <Navbar {...{ pageName }} />

        <div>{children}</div>
        <Footer />
      </div>
    </>
  )
}
