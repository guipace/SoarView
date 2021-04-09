import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment, editComment } from '../../store/comments';
import CommentCard from './CommentCard';

function CommentSection ({ flight, sessionUser }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const [error, setError] = useState('');

  const onComment = (e) => {
    if (comment) {
      e.preventDefault();

      const form = new FormData();
      form.append('user_id', sessionUser.id);
      form.append('flight_id', flight.id);
      form.append('comment', comment);

      dispatch(postComment(form));
      setComment('');
      setError('');
    } else {
      e.preventDefault();
      setError('Comment cannot be empty');
    }
  }

  const onEdit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('user_id', sessionUser.id);
    form.append('flight_id', flight.id);
    form.append('comment', comment);

    dispatch(editComment(updateComment.id, form));
    setComment('');
    setIsEditing(false);
  }

  return ( comments &&
    <div>
      <form onSubmit={isEditing? onEdit : onComment} className=''>
        <div className='flex items-center'>
          <input
            className='flex-grow h-10 mr-2 border'
            type='text'
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Post a comment'
          ></input>
          <button
            className="h-10 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
            type="submit">{isEditing ? 'Update' : 'Comment'}</button>
        </div>
      </form>
      {error && <div className="block my-2 text-center text-red-600 font-bold">{error}</div>}
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <CommentCard comment={comment} setComment={setComment} setIsEditing={setIsEditing} setUpdateComment={setUpdateComment} isEditing={isEditing}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CommentSection;
