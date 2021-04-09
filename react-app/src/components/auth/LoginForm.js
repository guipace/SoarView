import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

  const loginDemo = async () => {
    setEmail('demo@email.com');
    setPassword('password');

    const user = await login(email, password);

    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user));
    } else {
      setErrors(user.errors);
    }
  }

  return (
    <form onSubmit={onLogin} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='flex pb-2 items-center'>
        <label className='w-1/4'>Email</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div className='flex pb-2 items-center'>
        <label className='w-1/4'>Password</label>
        <input
          className='flex-grow ml-2'
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div className='flex justify-center'>
        <button
          className="self-center w-28 h-12 mx-2 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          type="submit">Log In</button>
        <button
          onClick={loginDemo}
          className="self-center w-28 h-12 mx-2 bg-white border-2	border-accent text-accent font-bold uppercase text-sm px-6 py-auto my-3 rounded shadow hover:shadow-lg hover:bg-background	outline-none focus:outline-none"
        >Demo Account</button>
      </div>
      <div className='self-center text-sm'>Not yet a member? <span className='text-accent cursor-pointer hover:underline' onClick={() => {setShowLoginModal(false); setShowSignupModal(true)}}>Sign up here.</span></div>
    </form>
  );
};

export default LoginForm;
