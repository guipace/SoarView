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

      const updatedUser = dispatch(editUser(updatedData));

      if (!updatedUser.errors) {
        // dispatch(setUser(updatedUser));
        setShowEditProfileModal(false);
      } else {
        setErrors(updatedUser.errors);
      }
    }
  };

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <form onSubmit={onEdit} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>New Image</label>
        <input
          className='flex-grow ml-2'
          type="file"
          name="imageFile"
          onChange={e => setImageFile(e.target.files[0])}
        ></input>
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
          // required={true}
        ></input>
      </div>
      <div className="relative px-6 pb-3 flex-auto flex justify-around">
        <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          type="submit">Edit</button>
        <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          onClick={() => setShowEditProfileModal(false)}
        >Cancel</button>
      </div>
    </form>
  );
};

export default EditProfileForm;
