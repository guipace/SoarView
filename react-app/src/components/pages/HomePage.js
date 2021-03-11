import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecentFlights } from '../../store/flight';
import FlightCard from '../components/FlightCard';

function HomePage() {
  const dispatch = useDispatch();
  const recentFlights = useSelector(state => state.flight.recentFlights);

  useEffect(() => {
    dispatch(getRecentFlights());

  }, [dispatch]);

  return ( recentFlights &&
    <div className='flex-1 mt-20 p-3 flex divide-x-2 font-noto'>
      <div className='w-1/2 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <h2 className='font-fira'>Most Recent Flights</h2>
          <div>
            {recentFlights.map(flight =>
              <div><FlightCard flight={flight} /></div>
            )}
          </div>
        </div>
        {/* <div>
          <h2>Top Pilots</h2>
          <div>Containing results</div>
        </div> */}
      </div>
      <div className='w-1/2 flex flex-col items-center'>
        <div className='flex items-center bg-secondary p-5 rounded'>
          <h2 className='font-fira'>Search Flights</h2>
          <div className='flex flex-col items-center'>
            <label>Start Date</label>
            <input
              type='date'
            />
          </div>
          <div className='flex flex-col items-center'>
            <label>End Date</label>
            <input
              type='date'
            />
          </div>
        </div>
        <div>Search Results</div>
      </div>
    </div>
  )
}

export default HomePage;
