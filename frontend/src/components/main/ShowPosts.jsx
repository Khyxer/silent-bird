import React, { useEffect } from "react";

import { useGetPosts } from "@/hooks/post/useGetPosts";
import { CardPost } from "./CardPost";
import { SimpleLoader } from "@/components/loaders/SimpleLoader";

export const ShowPosts = () => {
  const { dataPosts, fetchPosts, loading } = useGetPosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <SimpleLoader />
    );

  return (
    <div className="space-y-6">
      {dataPosts?.map((post) => (
        <CardPost post={post} key={post._id} />
      ))}
       
    </div>
  );
};
