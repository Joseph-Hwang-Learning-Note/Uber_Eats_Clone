import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from 'src/hooks/useMe';
import Logo from './logo';

const Header: React.FC = () => {

  const { data } = useMe();

  return (
    <>
      {
        !data?.me.verified && (
          <div className='bg-red-500 p-3 text-center text-base text-white'>
            <span>Please verify your email.</span>
          </div>
        )
      }
      <header className="py-4">
        <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-5 xl:px-0">
          <Link to='/'>
            <Logo className="w-36" />
          </Link>
          <span className="text-xs">
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
