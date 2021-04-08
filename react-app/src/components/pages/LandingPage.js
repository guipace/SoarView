import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faAngellist } from '@fortawesome/free-brands-svg-icons';
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
          <h1 className='font-hind text-center text-background'>Track your flights with SoarView</h1>
          <h3 className='my-1 italic font-noto text-center text-background'>The destination for glider pilots to upload, review and share flights they've recorded</h3>
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
        <div className='bg-primary bg-opacity-70 shadow-lg mt-10 px-5 py-2 flex flex-col text-black text-opacity-70 rounded'>
            <h5 className='font-fira'>About the Developer</h5>
            <div className='flex justify-around items-center space-x-1 rounded'>
              <a href='https://github.com/guipace'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faGithub}/>
              </a>
              <a href='https://www.linkedin.com/in/guilhermepace/'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faLinkedin}/>
              </a>
              <a href='https://angel.co/u/guilherme-pace'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faAngellist}/>
              </a>
              <a href='mailto:pace.gui@gmail.com'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faEnvelope}/>
              </a>
            </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
