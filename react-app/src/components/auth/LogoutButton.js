import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import { removeUser } from "../../store/session";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(removeUser());
  };

  return <button className='py-2 w-full' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
