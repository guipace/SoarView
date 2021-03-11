import { Link } from "react-router-dom";


function FlightCard({ flight }) {

  return (
    <Link to={`/flight/${flight.id}`}>
      <div className='flex divide-x-2 py-2 transform hover:scale-110 hover:bg-background'>
          <div className='flex flex-col px-2'>
            <div>Date: {flight.date.split(' ').slice(1,4).join(' ')}</div>
            {/* <div>Duration:</div> */}
          </div>
          <div className='flex flex-col px-2'>
            <div>Pilot: {flight.pilot}</div>
            <div>{flight.user.country}</div>
          </div>
          <div className='flex flex-col px-2'>
            <div>Glider: {flight.glider_model}</div>
            <div>Class: {flight.glider_class}</div>
          </div>
      </div>
    </Link>
  )
}

export default FlightCard;
