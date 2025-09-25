import React from "react";
import { HeaderMainPage } from "@/components/main/HeaderMainPage";
import { useUser } from "@/contexts/UserContexts";
import { Outlet } from "react-router-dom";
import { AsideMainPage } from "@/components/main/AsideMainPage";

export const MainPageLayout = () => {
  const { userData, userAuthenticated, loading } = useUser();

  return (
    <div className="min-h-screen flex text-light-color relative flex-col gap-6">
      <HeaderMainPage
        userData={userData}
        userAuthenticated={userAuthenticated}
        loadingUserContext={loading}
      />
      {/* Aside component */}
      <main className="max-w-7xl mx-auto w-full flex justify-between gap-6">
        
          <AsideMainPage />
        
        <div className=" w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
