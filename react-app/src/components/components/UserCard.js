import React from 'react';
import { Link } from 'react-router-dom';

function UserCard({user}) {


  return (
    <Link to={`/user/${user.id}`}>
      <div className='flex items-center group hover:bg-background'>
          <div className='mr-5 transform group-hover:scale-110'>
            <img className='h-14 w-14 object-cover' src={user.image_url} alt='user' />
          </div>
          <div>
            <div>{`${user.first_name} ${user.last_name}`}</div>
            <div className='text-sm'>{user.country}</div>
          </div>
      </div>
    </Link>
  )
}

export default UserCard;
