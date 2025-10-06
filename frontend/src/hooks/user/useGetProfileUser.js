import { useState } from "react";

export const useGetProfileUser = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserProfile = async (userName) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/profile?userName=${userName}`
      );
      const data = await response.json();

      // console.log(response.status);

      if (!response.ok) {
        throw new Error("Usuario no encontrado");
      }

      // console.log(data);
      setProfileUser(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    profileUser,
    loading,
    error,
    getUserProfile,
  };
};
