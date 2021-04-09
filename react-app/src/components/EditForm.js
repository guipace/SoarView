import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editFlight } from '../store/flight';

const EditForm = ({ flight, setShowEditModal }) => {
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState([]);
  const [pilot, setPilot] = useState(flight.pilot);
  const [copilot, setCopilot] = useState(flight.copilot);
  const [glider_model, setGliderModel] = useState(flight.glider_model);
  const [glider_class, setGliderClass] = useState(flight.glider_class);
  const [callsign, setCallsign] = useState(flight.callsign);
  const [registration, setRegistration] = useState(flight.registration);
  const [notes, setNotes] = useState(flight.notes);

  const onEdit = (e) => {
    e.preventDefault();

    const updatedData = {
      id: flight.id,
      pilot,
      copilot,
      glider_model,
      glider_class,
      callsign,
      registration,
      notes,
    }

    dispatch(editFlight(updatedData));
    setShowEditModal(false);
  };

  return (
    <form onSubmit={onEdit} className='flex flex-col font-noto'>
      {/* <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul> */}
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
      <div className="relative px-6 pb-3 flex-auto flex justify-around">
        <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          type="submit">Update</button>
        <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          onClick={() => setShowEditModal(false)}
        >Cancel</button>
      </div>
    </form>
  );
};

export default EditForm;
