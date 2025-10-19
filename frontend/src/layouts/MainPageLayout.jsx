import { HeaderMainPage } from "@/components/main/HeaderMainPage";
import { useUser } from "@/contexts/UserContexts";
import { Outlet } from "react-router-dom";
import { AsideMainPage } from "@/components/main/AsideMainPage";
import { MainLoader } from "@/components/loaders/MainLoader";

export const MainPageLayout = () => {
  const { userData, userAuthenticated, loading, logout } = useUser();

  if (loading) {
    return <MainLoader />;
  }

  return (
    <div className="min-h-screen flex text-light-color relative flex-col gap-6">
      <HeaderMainPage />
      {/* Aside component */}
      <main className="max-w-6xl mx-auto w-full flex justify-between gap-6">
        <AsideMainPage
          userData={userData}
          userAuthenticated={userAuthenticated}
          loadingUserContext={loading}
          handleLogOut={() => logout()}
        />

        <div className=" w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
