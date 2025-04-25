import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Comments from '../components/Comments.jsx';

function ShowVideo() {
    const navigate = useNavigate();
    const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);
  const [rerender, setRender] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}`); 
        setVideo(response.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    // Fetching videos for the right grid
    const fetchOtherVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8080'); 
        setOtherVideos(response.data);
      } catch (error) {
        console.error('Error fetching other videos:', error);
      }
    };

    fetchVideo();
    fetchOtherVideos();
  }, [rerender]);

  return (
    <>
    <div className='bg-black h-screen'>

        <Header/> 
      <div className="flex flex-col lg:flex-row bg-black  text-white">

      <div className="flex-1 p-6">
        {video && (
          <>
            <div className="mb-4">
                <img
                src={video.thumbnailURL}
                alt={video.title}
                className="w-full h-96 object-cover rounded-lg"
                />

            </div>
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex items-center mb-4">
              <div className='flex items-center space-x-2'>
                <AccountCircleIcon fontSize='large' className='text-white'/>
                <p className="font-semibold text-2xl">{video.channelId}</p>
                <button className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
                <span>👍</span>
                <span>{video.likes}</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
                <span>👀</span>
                <span>{video.views}</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
                <span>Download</span>
              </button>
            </div>
          </>
        )}
      </div>


      <div className="w-full lg:w-1/3 p-6">
        <h2 className="text-xl font-bold mb-4">Other Videos</h2>
        <div className="grid grid-cols-1 gap-4">
          {otherVideos.map((video) => (
            <div
            onClick={()=>{
                navigate(`/show/${video._id}`);
                setRender(!rerender);
            }}
              key={video._id}
              className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
            >
              <img
                src={video.thumbnailURL}
                alt={video.title}
                className="w-24 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-sm font-semibold">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.channelName}</p>
                <p className="text-xs text-gray-400">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      <Comments videoId={id}/>
    </div>
    </div>
    </>
  );
}

export default ShowVideo;