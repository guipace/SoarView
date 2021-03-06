import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from '../../store/user';

const EditProfileForm = ({ user, setShowEditProfileModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [country, setCountry] = useState(user.country);
  const [imageFile, setImageFile] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onEdit = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {

      const updatedData = {
        id: user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        country,
        image_file: imageFile,
        password,
      }

      const updatedUser = await dispatch(editUser(updatedData));

      if (!updatedUser.errors) {
        setShowEditProfileModal(false);
      } else {
        setErrors(updatedUser.errors);
      }
    }
  };

  return (
    <form onSubmit={onEdit} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        {email === 'demo@email.com' && <li >Editing is blocked on demo user account</li>}
        {email === 'demo@email.com' && <li >Please create a new account for this functionality</li>}
      </ul>
      <div className='flex pb-2'>
        <label className='w-1/4'>Email</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          disabled={email === 'demo@email.com'}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>First Name</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          disabled={email === 'demo@email.com'}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Last Name</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          disabled={email === 'demo@email.com'}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Country</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="country"
          placeholder="Country"
          onChange={e => setCountry(e.target.value)}
          value={country}
          disabled={email === 'demo@email.com'}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>New Image</label>
        {/* <input
          className='flex-grow ml-2'
          type="file"
          name="imageFile"
          onChange={e => setImageFile(e.target.files[0])}
          disabled={email === 'demo@email.com'}
        ></input> */}
        <label className="cursor-pointer min-w-max ml-2 bg-accent hover:bg-red-700 text-background font-bold py-2 px-2 uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none inline-flex items-center">
          <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          <span className="ml-1">Upload</span>
          <input className="hidden" type="file" name="imageFile" onChange={e => setImageFile(e.target.files[0])} ></input>
        </label>
        <div className='bg-white flex-grow ml-1 py-1 whitespace-nowrap overflow-hidden'><span className="ml-2">{imageFile.name}</span></div>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>New Password</label>
        <input
          className='flex-grow ml-2'
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          disabled={email === 'demo@email.com'}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'></label>
        <input
          className='flex-grow ml-2'
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          disabled={email === 'demo@email.com'}
          // required={true}
        ></input>
      </div>
      <div className="relative px-6 pb-3 flex-auto flex justify-around">
        <button
          className=" self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          disabled={email === 'demo@email.com'}
          type="submit">Update</button>
        <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          onClick={() => setShowEditProfileModal(false)}
        >Cancel</button>
      </div>
    </form>
  );
};

export default EditProfileForm;
