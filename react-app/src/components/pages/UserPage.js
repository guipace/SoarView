import React, { useEffect, useState } from 'react';
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
    <div className='mt-20 flex-1 flex flex-col p-5'>
      <div className='flex'>
        <img src={user.image_url} className='h-60 w-60 object-cover' alt='user'></img>
        <div>
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <p>{`Joined: ${user.created_at.split(' ').slice(1,4).join(' ')}`}</p>
          <p>{user.country}</p>
          <p>{`Logged flights: ${user.flights.length}`}</p>
        </div>
      </div>
      <div>
        <h2>Logbook</h2>
        {user.flights.map(flight =>
          <FlightCard key={flight.id} flight={flight} user={user}/>
        )}
      </div>
    </div>
  )
}

export default UserPage
