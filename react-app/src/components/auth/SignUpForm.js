import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from '../../services/auth';
import { setUser } from "../../store/session";

const SignUpForm = ({ setShowLoginModal, setShowSignupModal, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {

      const user = await signUp(email, firstName, lastName, country, imageFile, password);

      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user));
      } else {
        setErrors(user.errors);
      }
    }
  };

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <form onSubmit={onSignUp} className='flex flex-col font-noto'>
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
        <label className='w-1/4'>First Name</label>
        <input
          className='flex-grow ml-2 px-2'
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Last Name</label>
        <input
          className='flex-grow ml-2 px-2'
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Country</label>
        <input
          className='flex-grow ml-2 px-2'
          type="text"
          name="country"
          placeholder="Country"
          onChange={e => setCountry(e.target.value)}
          value={country}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Image</label>
        <input
          className='flex-grow ml-2 px-2'
          type="file"
          name="imageFile"
          onChange={e => setImageFile(e.target.files[0])}
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
      <div className='flex pb-2'>
        <label className='w-1/4'></label>
        <input
          className='flex-grow ml-2 px-2'
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          // required={true}
        ></input>
      </div>
      <button
        className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
        type="submit">Sign Up</button>
      <div className='self-center text-sm'>Already a member? <span className='text-accent cursor-pointer' onClick={() => {setShowLoginModal(true); setShowSignupModal(false)}}>Log in here.</span></div>
    </form>
  );
};

export default SignUpForm;
