import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IGCParser from 'igc-parser'

const UploadForm = ({ setShowUploadModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [igcFile, setIgcFile] = useState("");

  const onUpload = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('igcFile', igcFile);

    const response = await fetch('api/flight', {
      method: "POST",
      body: form,
    });

    const flight = await response.json();

    if (!flight.errors) {
      dispatch(setFlight(flight));
      // TODO: redirect to new flight page
    } else {
      setErrors(flight.errors);
    }


    // SOLUTION 1 - FROM URL
    // let igcText = await fetch('https://soarview.s3.amazonaws.com/12sv1wz1.igc').then(res => res.blob()).then(blob => blob.text())

    // try {
    //   let igcData = IGCParser.parse(igcText);
    //   console.log(igcData);
    // } catch (err) {
    //   console.error(err);
    // }

    // // SOLUTION 2 - FROM FILE OBJECT
    // let reader = new FileReader();
    // reader.readAsText(igcFile);

    // reader.onload = function() {
    //   try {
    //     let igcData = IGCParser.parse(reader.result);
    //     console.log(igcData);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // reader.onerror = function() {
    //   console.log(reader.error);
    // };
  };

  return (
    <form onSubmit={onUpload} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='flex pb-2'>
        <label className='w-1/4'>Image</label>
        <input
          className='flex-grow ml-2'
          type="file"
          name="imageFile"
          onChange={e => setIgcFile(e.target.files[0])}
        ></input>
      </div>
      <button
        className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
        type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
