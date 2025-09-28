import { useState } from "react";

export const useGetAllPosts = () => {
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/all`);
      const data = await response.json();
      setDataPosts(data.posts);
    } catch (error) {
      console.error(error);
      setDataPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return { dataPosts, fetchPosts, loading };
};
