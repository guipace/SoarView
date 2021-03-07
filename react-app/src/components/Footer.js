import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    sessionUser && (
        <div className='w-full bg-primary bottom-0'>FOOTER PLACEHOLDER</div>
    )
  );
}

export default Footer;
