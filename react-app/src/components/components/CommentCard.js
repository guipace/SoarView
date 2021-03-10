import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';

function CommentCard({comment}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const onDelete = () => {
    dispatch(deleteComment(comment.id))
  }

  return ( sessionUser &&
      <div className='flex items-center m-1'>
        <Link to={`/user/${comment.user.id}`}>
          <div className='mr-5 transform hover:scale-110'>
            <img className='h-8 w-8 object-cover rounded-full' src={comment.user.image_url} alt='user' />
          </div>
        </Link>
        <div className='flex-1'>
          <Link to={`/user/${comment.user.id}`}>
            <div className='text-sm hover:underline'>{comment.user.first_name}</div>
          </Link>
          <div className=''>{comment.comment}</div>
        </div>
        { sessionUser.id === comment.user.id &&
        <div onClick={onDelete} className='cursor-pointer'>
          <FontAwesomeIcon className='text-accent text-sm transform hover:scale-110' icon={faTrashAlt} />
        </div>}
      </div>
  )
}

export default CommentCard;
