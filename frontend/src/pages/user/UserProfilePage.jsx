import React, { useEffect } from "react";
import { useGetProfileUser } from "@/hooks/user/useGetProfileUser";
import { useParams } from "react-router-dom";
import { HeroProfileUser } from "@/components/user/HeroProfileUser";
import { useUser } from "@/contexts/UserContexts";
import { UserNotFound } from "@/components/user/UserNotFound";
import { Loader2 } from "lucide-react";

export const UserProfilePage = () => {
  const userName = useParams().userName;

  const { userData } = useUser();

  const currentUser = userData?.username === userName;

  const { getUserProfile, profileUser, loading } = useGetProfileUser();

  useEffect(() => {
    getUserProfile(userName);
  }, [userName]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-gray-color" />
      </div>
    );
  }

  if (!profileUser && !loading) {
    return <UserNotFound />;
  }

  return (
    <main>
      <HeroProfileUser profileUser={profileUser} currentUser={currentUser} />
    </main>
  );
};
