import { useState } from "react";

export const useFollowUser = () => {
  const [loading, setLoading] = useState(false);


  const followUser = async (usernameToFollow, isUnfollow) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/follow?usernameToFollow=${usernameToFollow}&isUnfollow=${isUnfollow}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(response.status);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadingFollow: loading,
    followUser,
  };
};
