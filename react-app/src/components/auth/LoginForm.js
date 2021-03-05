import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../../store/session";

const LoginForm = ({ setShowLoginModal, setShowSignupModal, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user));
    } else {
      setErrors(user.errors);
    }
  };

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <form onSubmit={onLogin} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='flex pb-2'>
        <label className='w-1/4'>Email</label>
        <input
          className='flex-grow ml-2 px-2'
          type="text"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Password</label>
        <input
          className='flex-grow ml-2 px-2'
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <button
        className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
        type="submit">Log In</button>
      <div className='self-center text-sm'>Not yet a member? <span className='text-accent cursor-pointer' onClick={() => {setShowLoginModal(false); setShowSignupModal(true)}}>Sign up here.</span></div>
    </form>
  );
};

export default LoginForm;
