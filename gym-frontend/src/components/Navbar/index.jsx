import React, { useContext } from 'react';
import {Link} from 'react-router-dom';

import { User } from 'react-feather'
import Logo from '../../assets/images/Logo.png';
import { WebsiteNecessaties } from '../../App';

import './index.css';

const Navbar = () => {
    const {token} = useContext(WebsiteNecessaties)
    const setToken = token[1];
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken("")
    }
return (
    <div className={`navbarWrapper ${token[0]? '' : 'loginNavbar' }`}>
        <div className="nav">
            <div className='leftSide'>
                <Link to={'/'} >
                    <img src={Logo} alt='Logo'/>
                </Link> 
            </div>
            <div className='rightSide'>
                <div className='dropdownMembers'>
                    <p className='navMenu navLink'>Members</p>
                    <div className='dropdownMenuMembers'>
                        <Link to={'/'} > <p className='dropdownLink'>List</p> </Link> 
                        <Link to={'/attendance'} > <p className='dropdownLink'>Attendance</p> </Link> 
                        <Link to={'/new-member'} >  <p className='dropdownLink'>Add Member</p> </Link>
                    </div>
                </div>
                <Link to={'/contact'} className='navMenu'> <p className='navLink'>Contact</p> </Link>
                <div className='dropdown'>
                    <User className='userIcon' ></User>
                    <div className='dropdownMenu'>
                        <Link to={'/profile'} > <p className='dropdownLink'>Profile</p> </Link> 
                        <p className='dropdownLink' onClick={handleLogout}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Navbar;