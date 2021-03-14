import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/user';
import FlightCard from '../components/FlightCard';

function UserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return ( user &&
    <div className='mt-20 flex-1 flex flex-col bg-background1 bg-cover bg-center'>
      <div className='bg-background h-full mx-auto py-5 px-8'>
        <div className='flex mb-5'>
          <img src={user.image_url} className='h-60 w-60 object-cover mr-3 rounded' alt='user'></img>
          <div className='flex-grow flex flex-col'>
            <h2>{`${user.first_name} ${user.last_name}`}</h2>
            <p>{`Joined: ${user.created_at.split(' ').slice(1,4).join(' ')}`}</p>
            <p className='flex-1'>{user.country}</p>
            <h3>{`Logged flights: ${user.flights.length}`}</h3>
            {sessionUser.id === user.id &&
            <button
            className="bg-accent mt-3 w-20 text-background font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none mx-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => console.log("CLICKED EDIT")}
            >
              Edit
            </button>}
          </div>
        </div>
        <div>
          <h2 className='font-fira'>Logbook</h2>
          {user.flights.map((flight, idx) =>
            <div className='flex items-center font-fira' key={flight.id}>
              <h2 className='mr-1'>{user.flights.length - idx}</h2>
              <FlightCard flight={flight} user={user}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage
