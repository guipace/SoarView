import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IGCParser from 'igc-parser'
import { useHistory } from "react-router";

const UploadForm = ({ setShowUploadModal }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
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
      let igcConfirmation = igcFile.name.split('.');
      if (igcConfirmation[igcConfirmation.length - 1].toLowerCase() === 'igc') {
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
      } else {
        setErrors(['We can only accept IGC files at the moment']);
        setIgcFile('');
      }
    }
  }, [igcFile]);

  useEffect(() => {
    //Populate form with IGC file data
    if (igcData) {
      igcData.date && setDate(igcData.date);
      igcData.pilot ? setPilot(igcData.pilot) : setPilot(`${sessionUser.first_name} ${sessionUser.last_name}`);
      igcData.copilot && setCopilot(igcData.copilot);
      igcData.gliderType && setGliderModel(igcData.gliderType);
      igcData.competitionClass && setGliderClass(igcData.competitionClass);
      igcData.callsign && setCallsign(igcData.callsign);
      igcData.registration && setRegistration(igcData.registration);
    }
  }, [igcData, sessionUser.first_name, sessionUser.last_name]);

  const onUpload = async (e) => {
    e.preventDefault();

    // if (igcFile.name === "DemoFile.igc") {
    //   setShowUploadModal(false);
    //   return history.push('/flight/1');
    // }

    const form = new FormData();
    form.append('user_id', sessionUser.id);
    form.append('igcFile', igcFile);
    form.append('date', date);
    form.append('pilot', pilot);
    form.append('copilot', copilot);
    form.append('glider_model', glider_model);
    form.append('glider_class', glider_class);
    form.append('callsign', callsign);
    form.append('registration', registration);
    form.append('notes', notes);

    const response = await fetch("/api/flight/", {
      method: "POST",
      body: form,
    });

    const flight = await response.json();

    if (!flight.errors) {
      setShowUploadModal(false);
      return  history.push(`/flight/${flight.id}`);
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

  const onLoadTestFile = async () => {
    let igcBlob = await fetch('https://soarview.s3.amazonaws.com/DemoFile.igc').then(res => res.blob())
    let file = new File([igcBlob], "DemoFile.igc");
    setIgcFile(file);
  }

  return (
    <form onSubmit={onUpload} className='flex flex-col font-noto'>
      <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='flex pb-2 items-center'>
        <label className='w-1/4'>IGC File</label>
        {/* <input
          className='flex-grow ml-2'
          type="file"
          name="igcFile"
          onChange={e => setIgcFile(e.target.files[0])}
        ></input> */}
        <label className="cursor-pointer min-w-max ml-2 bg-accent hover:bg-red-700 text-background font-bold py-2 px-2 uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none inline-flex items-center">
          <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
          </svg>
          <span className="ml-1">Upload</span>
          <input className="hidden" type="file" name="imageFile" onChange={e => setIgcFile(e.target.files[0])} ></input>
        </label>
        <div className='bg-white flex-grow ml-1 py-1 whitespace-nowrap overflow-hidden'><span className="ml-2">{igcFile.name}</span></div>
        <div
        className="text-center bg-white border-2	ml-1 border-accent text-accent font-bold p-0.5 uppercase text-xs rounded shadow hover:shadow-lg hover:bg-background	outline-none focus:outline-none cursor-pointer"
        onClick={() => onLoadTestFile()}
        >
          Load Test <br/> File
        </div>
      </div>
      <div className='flex pb-2 items-center'>
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
      <div className='flex pb-2 items-center'>
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
      <div className='flex pb-2 items-center'>
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
      <div className='flex pb-2 items-center'>
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
      <div className='flex pb-2 items-center'>
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
      <div className='flex pb-2 items-center'>
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
      <div className='flex pb-2 items-center'>
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
