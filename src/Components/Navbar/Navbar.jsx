import React, { useState } from 'react'
import './Navbar.css'
import { FaBars, FaUser, FaUserCheck, FaUserPlus, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RiMessage2Fill } from 'react-icons/ri'
import { FaUserMinus } from 'react-icons/fa6'

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)
  return (
    <nav className={`navbar ${showNav ? 'openNav' : 'closeNav'}`}>
        <div className={`navbar-item ${showNav ? 'openItems' : 'closeItems'} navbar-item-left`}>
            <ul>
                <Link to={'/home'}>
                    <FaUser />
                    <div className="item-info">Profile</div>
                </Link>
                <Link to={'/allUsers'}>
                    <FaUsers />
                    <div className="item-info">Users</div>
                </Link>
                <Link to={'/messages'}>
                    <RiMessage2Fill />
                    <div className="item-info">Messages</div>
                </Link>
            </ul>
        </div>
        <div className="menu-toggle" onClick={()=>setShowNav(!showNav)}>
            <FaBars />
        </div>
        <div className={`navbar-item ${showNav ? 'openItems' : 'closeItems'} navbar-item-right`}>
            <ul>
                <Link to={'/allRequest'}>
                    <FaUserPlus />
                    <div className="item-info">Requests</div>
                </Link>
                <Link to={'/myFriends'}>
                    <FaUserCheck />
                    <div className="item-info">Friends</div>
                </Link>
                <Link to={'/blocked'}>
                    <FaUserMinus />
                    <div className="item-info">Block</div>
                </Link>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar