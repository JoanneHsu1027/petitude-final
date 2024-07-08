import React from 'react'
import Layout1 from '../../component/layout/layout1'
import Head from 'next/head'
import { project } from '../../data/project'

export default function ProjectList() {
  const addToCart = (pid) => {
    const cartKey = 'project-cart'

    const item = project.find((p) => p.project_id === pid)
    if (!item) return // 沒找到項目就結束
    console.log({ pid, item })

    const oriData = localStorage.getItem(cartKey)
    let cartData = [] // 預設值
    try {
      cartData = JSON.parse(oriData)
      if (!Array.isArray(cartData)) {
        cartData = []
      }
    } catch (ex) {}

    const cartItem = cartData.find((p) => p.project_id === pid) // 購物車裡有沒有這個商品
    if (cartItem) return // 購物車裡已經有這個商品
    const {
      project_id,
      project_level,
      project_name,
      project_content,
      project_fee,
    } = item
    cartData.push({
      project_id,
      project_level,
      project_name,
      project_content,
      project_fee,
      quantity: 1,
    })

    localStorage.setItem(cartKey, JSON.stringify(cartData))
  }

  return (
    <Layout1 title="商品列表" pageName="project-list">
      <Head>
        <meta keyword="契約方案" />
      </Head>
      <h2>已購買的契約方案</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>方案編號</th>
            <th>方案等級</th>
            <th>方案名稱</th>
            <th>方案內容</th>
            <th>方案價格</th>
          </tr>
        </thead>
        <tbody>
          {project.map((p) => {
            return (
              <tr key={p.project_id}>
                <td>{p.project_id}</td>
                <td>{p.project_level}</td>
                <td>{p.project_name}</td>
                <td>{p.project_content}</td>
                <td>{p.project_fee}</td>
                {/* <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(p.project_id)}
                  >
                    按鈕
                  </button>
                </td> */}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout1>
  )
}
