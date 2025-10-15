import { NewPost } from "@/components/main/NewPost";
import { useUser } from "@/contexts/UserContexts";
import { ShowPosts } from "@/components/main/ShowPosts";
import { NewPostProvider } from "@/contexts/post/NewPostContexts";

export const MainPage = () => {
  const { userData, userAuthenticated } = useUser();
  return (
    <main className="flex w-full flex-col gap-6 pb-6">
      <NewPostProvider>
        {/* crear un nuevo post */}
        <NewPost userAuthenticated={userAuthenticated} userData={userData} />

        {/* mostrar los posts */}
        <ShowPosts />
      </NewPostProvider>
    </main>
  );
};
