import React from 'react'
import Navbar from '../Components/Navbar'
import MarketIndex from '../Components/MarketIndex'

export default function Investland() {
  return (
    <div>
      <Navbar></Navbar>
      <MarketIndex marketType="Index"></MarketIndex>
    </div>
  )
}
