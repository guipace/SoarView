import React, { useState } from "react";
import { LoginModal, SignupModal } from '../Modals';

function LandingPage({setAuthenticated}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} setAuthenticated={setAuthenticated}/>
      <SignupModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal} setAuthenticated={setAuthenticated}/>
      <div className='bg-background1 bg-cover bg-center w-full h-screen flex flex-col items-center justify-center'>
        <div className='bg-primary bg-opacity-70 shadow-lg px-5 pb-5 flex flex-col rounded'>
          <div>
            <img className='mx-auto' src='https://soarview.s3.amazonaws.com/logo_text.png' alt='logo' />
          </div>
          <h1 className='font-hind text-background'>Track your flights with Soar View</h1>
          <div className='mt-5 flex items-center justify-center'>
            <button
              className="bg-accent w-28 text-background font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none mx-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => setShowLoginModal(true)}
            >
              Log in
            </button>
            <button
              className="bg-accent w-28 text-background font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none mx-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => setShowSignupModal(true)}
            >
              Sign up
            </button>
          </div>
        </div>
        {/* <div>PLACEHOLDER FOR ABOUT THE DEVELOPER & TECHNOLOGIES</div> */}
      </div>
    </>
  );
}

export default LandingPage;
