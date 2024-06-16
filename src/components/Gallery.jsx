import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      console.log(`Fetching page ${page}`);
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setImages((prevImages) => [...prevImages, ...response.data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100) {
        console.log('Reached bottom');
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="image">
          <img src={`https://picsum.photos/id/${image.id}/400/300`} alt={image.author} />
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Gallery;
