import React from 'react';
import UserCard from './UserCard';

function FlightSidebar({flight, sessionUser}) {


  return ( flight && sessionUser &&
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
      <div className='mx-3 my-2 py-2'>PLACEHOLDER FOR COMMENT SECTION</div>
      {flight.user_id === sessionUser.id && <div className='mx-3 my-2 py-2'>
        <h3 className='text-center mb-2'>Upload Management</h3>
        <div className='flex justify-around '>
          <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          type="submit">Edit</button>
          <button
          className="self-center w-28 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
          type="submit">Delete</button>
        </div>
      </div>}
    </div>
  )
}

export default FlightSidebar;
