import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    // dispatch for recent flights
    // dispatch for top pilots

  }, []);

  return (
    <div className='flex-1 mt-20 p-3 flex divide-x-2'>
      <div className='w-1/2 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <h2>Most Recent Flights</h2>
          <div>
            Containing results
          </div>
        </div>
        <div>
          <h2>Top Pilots</h2>
          <div>Containing results</div>
        </div>
      </div>
      <div className='w-1/2 flex flex-col items-center'>
        <div>Search Flights</div>
        <div>Search Results</div>
      </div>
    </div>
  )
}

export default HomePage;
