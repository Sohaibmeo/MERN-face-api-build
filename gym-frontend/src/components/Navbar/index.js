import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';

import './index.css'

const Navbar = () => {
    const [scrollNavbar,setScrollNavbar] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY < 1;
            if (isTop !== scrollNavbar) {
              setScrollNavbar(isTop);
            }
          };
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, [scrollNavbar])
return (
    <div className={`${scrollNavbar ? "navbarWrapper" : "scrolledDown"}`}>
        {/* Upadting this navbar to have only 4 routes and a logo */}
        <div className="nav">
            <div className='leftSide'>
                <Link to={'/'} >
                    <img src={Logo} alt='Logo'/>
                    {/* <p>LOGO</p> */}
                </Link> 
            </div>
            <div className='rightSide'>
                <Link to={'/'} > <p className='navLink'>Home</p> </Link> 
                <Link to={'/attendance'} > <p className='navLink'>Attendance</p> </Link> 
                <Link to={'/new-member'} > <p className='navLink'>Add Member</p> </Link> 
                <Link to={'/lorem'} > <p className='navLink'>Lorem</p> </Link> 
            </div>
        </div>
    </div>
)
}

export default Navbar;