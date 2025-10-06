import { useState } from "react";
import { useUser } from "@/contexts/UserContexts";

export const useCuentasSugeridas = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  // console.log(userData);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      //url base
      let url = `${import.meta.env.VITE_API_URL}/users/suggested-accounts`;

      //agrega el query param si existe userData._id para que no se rompa esta mrda
      if (userData?._id) {
        url += `?userId=${userData._id}`;
      }

      //pasar la url al fetch
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.data[0]);
      if (!response.ok) {
        throw new Error(data.error);
      }
      setUsers(data.data);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return { users, fetchUsers, loading };
};
