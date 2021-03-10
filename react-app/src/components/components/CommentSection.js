import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from '../../store/comments';

function CommentSection ({ flight, sessionUser }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments);
  const [comment, setComment] = useState('');

  const onComment = (e) => {
    e.preventDefault();

    const form = new FormData()
    form.append('user_id', sessionUser.id)
    form.append('flight_id', flight.id)
    form.append('comment', comment)

    dispatch(postComment(form))
  }

  return (
    <div>
      <form onSubmit={onComment} className=''>
        <div className='flex items-center'>
          <input
            className='flex-grow h-10 mr-2 border'
            type='text'
            name='comment'
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
            placeholder='Post a comment'
          ></input>
          <button
            className="h-10 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
            type="submit">Comment</button>
        </div>
      </form>
      <div>
        {flight.comments.map((comment) => {
          return (
            <div>

              <p>{comment.comment}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CommentSection;
