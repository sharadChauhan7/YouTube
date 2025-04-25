import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
    console.log(comments);

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/comments/${videoId}`);

        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [videoId]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    console.log('Posting comment:', newComment);
    console.log('Video ID:', videoId);

    try {
      const authToken = localStorage.getItem('authToken');

      const response = await axios.post(`http://localhost:8080/comments/${videoId}`, {
        text: newComment,
        authToken
      });
      toast.success('Comment posted successfully!');
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="bg-black p-4">
      <h2 className="text-lg font-bold text-white mb-4">Comments</h2>

      {isLoggedIn ? (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
          <button
            onClick={handlePostComment}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="text-gray-400 mb-4">Log in to post a comment.</p>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length>0 && comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg"
          >
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">

              <AccountCircleIcon fontSize="large" className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{comment.userId.name}</p>
              <p className="text-gray-300">{comment.text}</p>
            </div>
            <p className="text-gray-400 text-sm">a while ago</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;