/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return null;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al verificar usuario");
      }

      setUserData(data.data);
      setUserAuthenticated(true);
      setError(null);
      return data.data;
    } catch (err) {
      setError(err.message);
      setUserData(null);
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setUserAuthenticated(false);
    setError(null);
    window.location.href = "/auth";
  };

  const updateUserData = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  const isAuthorized = () => {
    if (userData?.role === "user" || !userData) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    userData,
    loading,
    userAuthenticated,
    error,
    fetchUserData,
    logout,
    updateUserData,
    isAuthorized,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
