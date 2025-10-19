import { HeaderMainPage } from "@/components/main/HeaderMainPage";
import { useUser } from "@/contexts/UserContexts";
import { Outlet } from "react-router-dom";
import { MainLoader } from "@/components/loaders/MainLoader";
import { NoAuthUser } from "@/pages/general/NoAuthUser";
import { AsideMessagePage } from "@/components/messages/AsideMessagePage";
import { MessagesProvider } from "@/contexts/messages/MessagesContexts";

export const MessagesLayout = () => {
  const { userAuthenticated, loading } = useUser();

  if (loading) {
    return <MainLoader />;
  }

  if (!userAuthenticated) {
    return <NoAuthUser />;
  }

  return (
    <div className="h-screen flex text-light-color relative flex-col ">
      <HeaderMainPage />
      {/* Aside component */}
      <MessagesProvider>
        <main className="max-w-6xl mx-auto w-full flex justify-between h-full overflow-hidden">
          <AsideMessagePage />
          <div className="overflow-y-auto flex-1">
            <Outlet />
          </div>
        </main>
      </MessagesProvider>
    </div>
  );
};
