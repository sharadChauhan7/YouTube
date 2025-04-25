import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

function Body() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/'); 
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 bg-black  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Body;