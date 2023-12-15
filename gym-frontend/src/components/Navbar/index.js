import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/logo512.png';

import './index.css'

const Navbar = () => {
return (
    <div className='navbarWrapper'>
        {/* Upadting this navbar to have only 4 routes and a logo */}
        <div className='nav'>
            <div className='leftSide'>
                <Link to={'/'} >
                    <img src={Logo} alt='Logo'/>
                    <p>LOGO</p>
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