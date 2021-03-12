import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecentFlights, getSearchFlights, removeSearchFlights } from '../../store/flight';
import FlightCard from '../components/FlightCard';

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = `${yyyy}-${mm}-${dd}`

function HomePage() {
  const dispatch = useDispatch();
  const [ startDate, setStartDate ] = useState('');
  const [ endDate, setEndDate ] = useState(today);
  const recentFlights = useSelector(state => state.flight.recentFlights);
  const searchFlights = useSelector(state => state.flight.searchFlights);

  useEffect(() => {
    dispatch(getRecentFlights());
  }, [dispatch]);

  useEffect(() => {
    dispatch(removeSearchFlights())
    if (startDate && endDate) {
      dispatch(getSearchFlights(startDate, endDate))
    }
  }, [dispatch, startDate, endDate])

  return ( recentFlights &&
    <div className='flex-1 mt-20 p-3 flex divide-x-2 font-noto'>
      <div className='w-1/2 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <h2 className='font-fira'>Most Recent Flights</h2>
          <div>
            {recentFlights.map(flight =>
              <FlightCard key={flight.id} flight={flight} />
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
          <h2 className='font-fira'>Search</h2>
          <div className='flex flex-col items-center mx-3'>
            <label>Start Date</label>
            <input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center'>
            <label>End Date</label>
            <input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>
        { searchFlights &&
        <div>
          {searchFlights.map(flight =>
            <FlightCard key={flight.id} flight={flight} />
          )}
        </div>}
      </div>
    </div>
  )
}

export default HomePage;
