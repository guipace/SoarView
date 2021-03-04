import React, { useState } from "react";
import { LoginModal, SignupModal } from './Modals';

function LandingPage({setAuthenticated}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} setAuthenticated={setAuthenticated}/>
      <SignupModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} setAuthenticated={setAuthenticated}/>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className=''>
          <img src='https://soarview.s3.amazonaws.com/logo_text.png' alt='logo' />
          <h1>Welcome to Soar View!</h1>
          <button
            className="bg-accent text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => setShowLoginModal(true)}
          >
            Log in
          </button>
          <button
            className="bg-accent text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => setShowSignupModal(true)}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
