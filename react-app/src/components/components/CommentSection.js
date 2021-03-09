import React, { useState, useEffect } from "react";

function CommentSection ({ flight }) {
  const [comment, setComment] = useState('');

  const onComment = (e) => {
    e.preventDefault();
    console.log("COMMENTED");
  }

  return (
    <div>
      <form onSubmit={onComment} className=''>
        <div className='flex items-center'>
          <input
            className='flex-grow h-10 mr-2'
            type='text'
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Post a comment'
          ></input>
          <button
            className="h-10 bg-accent text-background font-bold uppercase text-sm px-6 py-3 my-3 rounded shadow hover:shadow-lg hover:bg-red-700	outline-none focus:outline-none"
            type="submit">Comment</button>
        </div>
      </form>
      <div>RENDER COMMENTS</div>
    </div>
  )
}

export default CommentSection;
