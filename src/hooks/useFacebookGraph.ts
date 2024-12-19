import { useState, useEffect } from 'react';
import { FacebookGraphService } from '../services/facebook/FacebookGraphService';
import { FacebookUserData } from '../services/facebook/types';

export const useFacebookGraph = () => {
  const [profile, setProfile] = useState<FacebookUserData | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const graphService = FacebookGraphService.getInstance();
      
      try {
        const [profileData, postsData, photosData] = await Promise.all([
          graphService.fetchUserProfile(),
          graphService.fetchUserPosts(),
          graphService.fetchUserPhotos()
        ]);

        setProfile(profileData);
        setPosts(postsData);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching Facebook data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    profile,
    posts,
    photos,
    loading
  };
};