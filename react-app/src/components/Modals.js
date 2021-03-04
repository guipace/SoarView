import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm'

export function LoginModal({ showLoginModal, setShowLoginModal, setShowSignupModal, setAuthenticated }) {
  return (
    showLoginModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onClick={() => setShowLoginModal(false)}
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {/*content*/}
            <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <img className='max-h-10	mr-2' src='https://soarview.s3.amazonaws.com/logo_no_text.png' alt='logo' />
                <h2 className="font-fira">Log in</h2>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowLoginModal(false)}
                >
                    ×
                </button>
              </div>
              {/*body*/}
              <div className="relative px-6 pb-3 flex-auto">
                <LoginForm setAuthenticated={setAuthenticated} setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal}/>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null
  );
}

export function SignupModal({ showSignupModal, setShowSignupModal, setShowLoginModal, setAuthenticated }) {
  return (
    showSignupModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onClick={() => setShowSignupModal(false)}
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {/*content*/}
            <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <img className='max-h-10	mr-2' src='https://soarview.s3.amazonaws.com/logo_no_text.png' alt='logo' />
                <h2 className="font-fira">Sign up</h2>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowSignupModal(false)}
                >
                    ×
                </button>
              </div>
              {/*body*/}
              <div className="relative px-6 pb-3 flex-auto">
                <SignUpForm setAuthenticated={setAuthenticated} setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal}/>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null
  );
}
