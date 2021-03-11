import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faAngellist } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    sessionUser && (
        <div className='flex justify-around w-full bg-primary bottom-0 py-2'>
          <div>
            <h5>About the Developer</h5>
            <div className='flex justify-around items-center bg-background bg-opacity-80 h-11 p-1 space-x-1 rounded'>
              <a href='https://github.com/guipace'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faGithub}/>
              </a>
              <a href='https://www.linkedin.com/in/guilhermepace/'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faLinkedin}/>
              </a>
              <a href=''>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faAngellist}/>
              </a>
              <a href='mailto:pace.gui@gmail.com'>
                <FontAwesomeIcon className='text-2xl transform hover:scale-110' icon={faEnvelope}/>
              </a>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <h5>Technologies</h5>
            <div className='flex justify-around items-center bg-background bg-opacity-80 h-11 p-1 space-x-1 rounded'>
              <a href='https://developer.mozilla.org/en-US/docs/Web/CSS'>
                <img src='https://soarview.s3.amazonaws.com/logo-css3.png' alt='css3' className='h-9 transform hover:scale-110'></img>
              </a>
              <a href='https://palletsprojects.com/p/flask/'>
                <img src='https://soarview.s3.amazonaws.com/logo-flask.png' alt='flask' className='h-6 transform hover:scale-110'></img>
              </a>
              <a href='https://developer.mozilla.org/en-US/docs/Web/HTML'>
                <img src='https://soarview.s3.amazonaws.com/logo-html5.png' alt='html5' className='h-7 transform hover:scale-110'></img>
              </a>
              <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>
                <img src='https://soarview.s3.amazonaws.com/logo-javascript.png' alt='javascript' className='h-7 transform hover:scale-110'></img>
              </a>
              <a href='https://nodejs.org/'>
                <img src='https://soarview.s3.amazonaws.com/logo-nodejs.png' alt='nodejs' className='h-8 transform hover:scale-110'></img>
              </a>
              <a href='https://www.postgresql.org/'>
                <img src='https://soarview.s3.amazonaws.com/logo-postgresql.png' alt='postgresql' className='h-7 transform hover:scale-110'></img>
              </a>
              <a href='https://www.python.org/'>
                <img src='https://soarview.s3.amazonaws.com/logo-python.png' alt='python' className='h-7 transform hover:scale-110'></img>
              </a>
              <a href='https://reactjs.org/'>
                <img src='https://soarview.s3.amazonaws.com/logo-react.png' alt='react' className='h-7 transform hover:scale-110'></img>
              </a>
              <a href='https://redux.js.org/'>
                <img src='https://soarview.s3.amazonaws.com/logo-redux.png' alt='redux' className='h-6 transform hover:scale-110'></img>
              </a>
            </div>
          </div>
        </div>
    )
  );
}

export default Footer;
