import React from 'react'
import Dashboard from '../Components/Dashboard'
import Navbar from '../Components/Navbar'
import HeldShares from '../Components/HeldShares'
import Topbar from '../Components/Topbar'
export default function Investments() {
  return (
    <div>
      <Navbar></Navbar>
      <Topbar />
      <Dashboard></Dashboard>
      <HeldShares></HeldShares>
    </div>
  )
}
