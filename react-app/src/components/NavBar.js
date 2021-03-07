import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { UploadModal } from './Modals';

const NavBar = ({ setAuthenticated }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    sessionUser && (
      <>
        <UploadModal showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal} />
        <nav className='fixed w-full flex items-center shadow-xl bg-primary h-20 font-noto text-accent font-bold uppercase'>
          <NavLink className='hover:bg-secondary h-full flex items-center' to="/" exact={true} activeClassName="active">
            <img className='h-20 mx-5' src='https://soarview.s3.amazonaws.com/logo_text.png' alt='logo' />
          </NavLink>
          <div className='flex-grow'></div>
          <div className='flex items-center h-full'>
            <div className='px-5 hover:no-underline hover:bg-secondary h-full flex items-center text-center tracking-widest cursor-pointer' onClick={() => setShowUploadModal(true)}>
              Upload
              <br />
              Flight
            </div>
            <div className='cursor-pointer' >
              <img className='h-16 mx-5 rounded-full bg-secondary cursor-pointer transform hover:scale-105 hover:shadow' onClick={() => setDropdownVisible(prev => !prev)} src={sessionUser.image_url} alt='user avatar' />
            </div>
          </div>
        </nav>
        <div id='navbar-placeholder' className='h-20'></div>
        {dropdownVisible &&
          <div className='bg-primary w-32 fixed top-20 right-0 flex flex-col' onMouseLeave={() => setDropdownVisible(prev => !prev)}>
            <div className='text-center	py-2 hover:bg-secondary'>My Profile</div>
            <div className='hover:bg-secondary'>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </div>
          </div>}
      </>
    )
  );
}

export default NavBar;
