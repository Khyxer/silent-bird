import React from "react";
import { NewPost } from "@/components/main/NewPost";
import { useUser } from "@/contexts/UserContexts";
import { ShowPosts } from "@/components/main/ShowPosts";

export const MainPage = () => {
  const { userData, userAuthenticated } = useUser();
  return (
    <main className="flex w-full flex-col gap-6 pb-6">
      {/* crear un nuevo post */}
      <NewPost userAuthenticated={userAuthenticated} userData={userData} />

      {/* mostrar los posts */}
      <ShowPosts />
    </main>
  );
};
