import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { EditModal, DeleteModal } from '../Modals';
import CommentSection from './CommentSection';

function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}

function FlightSidebar({flight, sessionUser, igcParsedData}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [duration, setDuration] = useState();

  useEffect(() => {
    if(igcParsedData) {
      const startTime = new Date(igcParsedData.fixes[0].timestamp);
      const endTime = new Date(igcParsedData.fixes[igcParsedData.fixes.length - 1].timestamp);
      const flightDuration = msToTime(endTime - startTime);
      setDuration(flightDuration);
    }
  }, [igcParsedData]);

  return ( flight && sessionUser &&
    <>
      <EditModal flight={flight} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
      <DeleteModal flight={flight} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
      <div className='font-noto w-full md:w-3/12 md:order-1 overflow-y-auto flex flex-col divide-y-2'>
        <div className='mx-3 my-2'>
          <UserCard user={flight.user}/>
        </div>
        <div className='mx-3 my-2 py-2'>
          <h3 className='text-center mb-2'>Flight Information</h3>
          <table className='w-full table-auto'>
            <thead>
              <tr>
                <th className='w-1/3'></th>
                <th className='w-1/2'></th>
              </tr>
            </thead>
            <tbody>
            <tr className='bg-background'>
                <td className='pl-2'>Date</td>
                <td>{flight.date.split(' ').slice(0,4).join(' ')}</td>
            </tr>
            <tr>
                <td className='pl-2'>Duration</td>
                <td>{duration}</td>
            </tr>
            <tr>
                <td className='pl-2'>Pilot</td>
                <td>{flight.pilot}</td>
            </tr>
            <tr className='bg-background'>
                <td className='pl-2'>Copilot</td>
                <td>{flight.copilot}</td>
            </tr>
            <tr>
                <td className='pl-2'>Glider</td>
                <td>{flight.glider_model}</td>
            </tr>
            <tr className='bg-background'>
                <td className='pl-2'>Class</td>
                <td>{flight.glider_class}</td>
            </tr>
            <tr>
                <td className='pl-2'>Callsign</td>
                <td>{flight.callsign}</td>
            </tr>
            <tr className='bg-background'>
                <td className='pl-2'>Registration</td>
                <td>{flight.registration}</td>
            </tr>
            <tr>
                <td className='pl-2'>Pilot Notes</td>
                <td>{flight.note}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='mx-3 my-2 py-2'>
          <CommentSection flight={flight} sessionUser={sessionUser} />
        </div>
        {flight.user_id === sessionUser.id &&
        <div className='mx-3 my-2 py-2'>
          <h4 className='text-center mb-2'>Upload Management</h4>
          <div className='flex justify-around '>
            <button
            className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
            onClick={() => setShowEditModal(true)}
            >Edit</button>
            <button
            className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
            onClick={() => setShowDeleteModal(true)}
            >Delete</button>
          </div>
        </div>}
      </div>
    </>
  )
}

export default FlightSidebar;
