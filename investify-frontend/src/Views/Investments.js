import React from 'react'
import Dashboard from '../Components/Dashboard'
import Navbar from '../Components/Navbar'
import HeldShares from '../Components/HeldShares'
export default function Investments() {
  return (
    <div>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
      <HeldShares></HeldShares>
    </div>
  )
}
