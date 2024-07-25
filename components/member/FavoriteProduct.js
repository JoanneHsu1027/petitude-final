//商品收藏

import React, { useEffect, useState } from 'react'

const FavoriteProduct = ({ memberData, onEdit }) => {
  useEffect(() => {}, [memberData])

  return (
    <div className="p-4">
      <h3 className="mb-4">收藏商品</h3>
    </div>
  )
}

export default FavoriteProduct
