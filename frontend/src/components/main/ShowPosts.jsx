import React, { useEffect } from "react";

import { useGetPosts } from "@/hooks/post/useGetPosts";
import { CardPost } from "./CardPost";
import { Loader2 } from "lucide-react";

export const ShowPosts = () => {
  const { dataPosts, fetchPosts, loading } = useGetPosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-gray-color" />
      </div>
    );

  return (
    <div className="space-y-6">
      {dataPosts?.map((post) => (
        <CardPost post={post} key={post._id} />
      ))}
       
    </div>
  );
};
