import { useState } from "react";

export const useSearchUser = () => {
  const [userToFind, setUserToFind] = useState("");
  const [loadingUserSearch, setLoadingUserSearch] = useState(false);
  const [usersFinded, setUsersFinded] = useState([]);

  const searchUser = async () => {
    try {
      setLoadingUserSearch(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/user/search?partUserName=${userToFind}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUsersFinded(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserSearch(false);
    }
  };


  return {
    userToFind,
    setUserToFind,
    searchUser,
    loadingUserSearch,
    usersFinded,
  };
};
