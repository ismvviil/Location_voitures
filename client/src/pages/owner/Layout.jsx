import React from 'react'
import NavBarOwner from '../../components/owner/NavBarOwner'
import SideBar from '../../components/owner/SideBar'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className='flex flex-col'>
      <NavBarOwner />

      <div className='flex'>
      <SideBar />
      <Outlet />
      </div>
    </div>
  )
}

export default Layout
