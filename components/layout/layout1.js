import React from 'react'
import Navbar from './navbar'
import Head from 'next/head'
import Footer from './footer'

export default function Layout({ children, title = '', pageName = '' }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' | Petitude' : 'Petitude'}</title>
      </Head>
      <Navbar {...{ pageName }} />
      <div>{children}</div>
      <Footer />
    </>
  )
}
