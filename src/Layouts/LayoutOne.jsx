import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

const LayoutOne = () => {
  return (
    <div>
        <Navbar />
        <div className='mt-[145px]'>
          <Outlet />
        </div>
    </div>
  )
}

export default LayoutOne