import { faSignOut, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { useMehook } from '../hooks/useMehook';
import logo from '../images/title-logo.svg';

export const Header: React.FC = () => {
  const { data } = useMehook();
  const history = useHistory();
  const logOutBtn = () => {
    localStorage.removeItem('dliver-token');
    isLoggedInVar(false);
    history.push('/');
  };
  return (
    <>
      {!data?.me.verified && (
        <div className=" bg-yellow-300 text-center p-3 text-sm ">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" py-4">
        <div className=" w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="D-liver" className="w-24" />
          </Link>

          <span className="text-xl">
            <Link to="/edit-profile">
              <FontAwesomeIcon
                icon={faUserAlt}
                className="text-xl mx-3 hover:text-yellow-400"
              />
            </Link>
            <button onClick={logOutBtn}>
              <FontAwesomeIcon
                icon={faSignOut}
                className="text-xl hover:text-red-600"
              />
            </button>
          </span>
        </div>
      </header>
    </>
  );
};
