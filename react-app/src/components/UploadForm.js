import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFlight } from '../store/flight';
import IGCParser from 'igc-parser'

const UploadForm = ({ setShowUploadModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [igcFile, setIgcFile] = useState('');
  const [igcData, setIgcData] = useState('');
  const [date, setDate] = useState('');
  const [pilot, setPilot] = useState('');
  const [copilot, setCopilot] = useState('');
  const [glider_model, setGliderModel] = useState('');
  const [glider_class, setGliderClass] = useState('');
  const [callsign, setCallsign] = useState('');
  const [registration, setRegistration] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    //Parse IGC file
    if (igcFile) {
      let fileReader = new FileReader();
      fileReader.readAsText(igcFile);
      fileReader.onload = function() {
        try {
          let igcParsedData = IGCParser.parse(fileReader.result);
          console.log(igcParsedData);
          setIgcData(igcParsedData);
        } catch (err) {
          setErrors(err);
        }
      };
      fileReader.onerror = function() {
        setErrors(fileReader.error);
      };
    }
  }, [igcFile])

  useEffect(() => {
    //Populate form with IGC file data
    if (igcData) {
      igcData.pilot && setPilot(igcData.pilot);
      igcData.copilot && setCopilot(igcData.copilot);
      igcData.gliderType && setGliderModel(igcData.gliderType);
      igcData.competitionClass && setGliderClass(igcData.competitionClass);
      igcData.callsign && setCallsign(igcData.callsign);
      igcData.registration && setRegistration(igcData.registration);
    }
  }, [igcData]);

  const onUpload = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('igcFile', igcFile);
    form.append()

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


    // // SOLUTION 1 - FROM URL
    // let igcText = await fetch('https://soarview.s3.amazonaws.com/12sv1wz1.igc').then(res => res.blob()).then(blob => blob.text())

    // try {
    //   let igcData = IGCParser.parse(igcText);
    //   console.log(igcData);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <form onSubmit={onUpload} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='flex pb-2'>
        <label className='w-1/4'>IGC File</label>
        <input
          className='flex-grow ml-2'
          type="file"
          name="igcFile"
          onChange={e => setIgcFile(e.target.files[0])}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Pilot Name</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="pilot"
          placeholder={pilot}
          onChange={e => setPilot(e.target.value)}
          value={pilot}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Copilot Name</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="copilot"
          placeholder={copilot}
          onChange={e => setCopilot(e.target.value)}
          value={copilot}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Glider Model</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="glider_model"
          placeholder={glider_model}
          onChange={e => setGliderModel(e.target.value)}
          value={glider_model}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Glider Class</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="glider_class"
          placeholder={glider_class}
          onChange={e => setGliderClass(e.target.value)}
          value={glider_class}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Callsign</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="callsign"
          placeholder={callsign}
          onChange={e => setCallsign(e.target.value)}
          value={callsign}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Registration</label>
        <input
          className='flex-grow ml-2'
          type="text"
          name="registration"
          placeholder={registration}
          onChange={e => setRegistration(e.target.value)}
          value={registration}
        ></input>
      </div>
      <div className='flex pb-2'>
        <label className='w-1/4'>Notes</label>
        <textarea
          className='flex-grow ml-2'
          type="textarea"
          name="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        ></textarea>
      </div>
      <button
        className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
        type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
