import { useState } from "react";

export const useGetPosts = () => {
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //conseguir todos los post
  const fetchPosts = async (username) => {
    try {
      setLoading(true);

      //url base
      let url = `${import.meta.env.VITE_API_URL}/posts`;

      //agrega el query param si existe username para que no se rompa esta mrda
      if (username) {
        url += `?username=${username}`;
      }

      //pasar la url al fetch
      const response = await fetch(url);
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
