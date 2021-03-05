import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    sessionUser && (
      <>
      <nav className='flex items-center shadow bg-primary h-20 '>
        <NavLink className='hover:bg-secondary h-full' to="/" exact={true} activeClassName="active">
          <img className='h-16 mx-5 ' src='https://soarview.s3.amazonaws.com/logo_text.png' alt='logo' />
        </NavLink>
        <div className='flex-grow'></div>
        <div className='flex'>
          <NavLink to="/" exact={true} activeClassName="active">
            Upload Flight
          </NavLink>
          <div className='cursor-pointer' onClick={() => setDropdownVisible(prev => !prev)}>
            <img className='h-16 mx-5 rounded-full bg-secondary' src={sessionUser.image_url} alt='user avatar' />
          </div>
        </div>



        {/* <ul>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li>
        </ul> */}
      </nav>
      {dropdownVisible &&
        <div className='bg-primary w-24 fixed right-0	'>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>}
      </>
    )
  );
}

export default NavBar;
