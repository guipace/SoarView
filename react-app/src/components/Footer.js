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
            <div className='flex justify-around'>
              <a href='https://github.com/guipace'>
                <FontAwesomeIcon className='' icon={faGithub}/>
              </a>
              <a href='https://www.linkedin.com/in/guilhermepace/'>
                <FontAwesomeIcon className='' icon={faLinkedin}/>
              </a>
              <a href=''>
                <FontAwesomeIcon className='' icon={faAngellist}/>
              </a>
              <a href='mailto:pace.gui@gmail.com'>
                <FontAwesomeIcon className='' icon={faEnvelope}/>
              </a>
            </div>
          </div>
          <div>
            <h5>Technologies</h5>
            <div className='flex justify-around'>
            </div>
          </div>
        </div>
    )
  );
}

export default Footer;
