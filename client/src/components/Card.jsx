import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
function Card({ video }) {
    const navigate = useNavigate();
  return (
    <div onClick={()=>{
        navigate(`/show/${video._id}`);
    }} className="border border-gray-300 rounded-lg p-4 w-72 shadow-md hover:shadow-lg transition-shadow duration-300">
      <img 
        src={video.thumbnailURL} 
        alt={video.title} 
        className="w-full h-40 object-cover rounded-lg mb-4" 
      />
      <h3 className="text-lg font-semibold mb-2 text-white">{video.title}</h3>
      <div className='flex items-center mb-2'>
      <AccountCircleIcon fontSize='large' className='text-white'/>
      <p className="text-lg mb-1 ml-2 text-white"> {video.channelId}</p>
      </div>
      <div className='flex justify-between'>
      <p className=" text-sm text-white">{video.views.toLocaleString()} views</p>
      <p className=" text-sm text-white">{video.likes.toLocaleString()} likes</p>
      </div>
    </div>
  );
}

export default Card;