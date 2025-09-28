import React, { useEffect } from "react";

import { useGetAllPosts } from "@/hooks/post/useGetAllPosts";
import { CardPost } from "./CardPost";
import { Loader2 } from "lucide-react";

export const ShowPosts = () => {
  const { dataPosts, fetchPosts, loading } = useGetAllPosts();

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
      {/* <section className="w-full p-4 border rounded-xl border-gray-color/50">
        <header className="flex justify-between items-center ">
          <div className="flex gap-4 cursor-pointer group">
            <img
              src="https://i.pinimg.com/736x/5a/1a/d6/5a1ad61b5a3f3ccb7e5ddda6e88fe871.jpg"
              alt=""
              className="w-14 aspect-square object-cover rounded-full"
            />
            <div className="flex flex-col">
              <h5 className="text-lg font-semibold group-hover:underline">
                Megumin
              </h5>
              <div className="flex gap-2 text-sm text-gray-color">
                <span>@megumin</span>
                <span>•</span>
                <span>1h ago</span>
              </div>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer">
            <Ellipsis />
          </button>
        </header>

        <article className="py-5 border-b border-gray-color/50 flex flex-col gap-3">
          <p>
            Why is it illegal to blow things up? It's not like it's going to
            hurt anyone, right? There should be a law that allows blowing up
            even one building every hour or maybe half an hour. Today I received
            a lawsuit letter for blowing up a hospital, even though it wasn't my
            fault, since the hospital got in my way. Just because of that, the
            letter already calls them "terrorist" acts. They're too fragile.
          </p>

          <div className="max-h-120 w-full flex justify-center items-center">
            <img
              src="https://img.freepik.com/foto-gratis/formulario-divorcio-primer-plano-anillos-boda-mesa_23-2148548582.jpg"
              alt="asd"
              className="rounded-xl object-contain h-auto w-auto max-h-110 max-w-full"
            />
          </div>
        </article>

        <footer className="flex justify-between items-center pt-3">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-red-800/20 rounded-lg cursor-pointer flex gap-2 items-center">
              <Heart />
              <span>29</span>
            </button>
            <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
              <MessageCircle />
              <span>726</span>
            </button>
            <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
              <Share2 />
              <span>276</span>
            </button>
          </div>
          <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
            <Bookmark />
          </button>
        </footer>
      </section> */}
    </div>
  );
};
