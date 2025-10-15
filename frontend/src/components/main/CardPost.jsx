import React, { useState } from "react";
import { useUser } from "@/contexts/UserContexts";
import { timeAgo } from "@/utils/timeAgo";
import {
  Ellipsis,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsDown,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useHandleActionsPost } from "@/hooks/post/useHandleActionsPost";
import { Link } from "react-router-dom";

export const CardPost = ({ post }) => {
  const { userData } = useUser();
  const { likeCount, handleLikePost, isLikedByUser } = useHandleActionsPost({
    post,
    userData,
  });
  timeAgo(post.createdAt);

  const [currentIndexImage, setCurrentIndexImage] = useState(0);

  const handleNextImage = () => {
    setCurrentIndexImage((prev) => (prev + 1) % post.images?.length);
  };

  const handlePrevImage = () => {
    setCurrentIndexImage(
      (prev) => (prev - 1 + post.images?.length) % post.images?.length
    );
  };

  return (
    <section
      className="w-full  border rounded-xl border-gray-color/50"
      key={post._id}
    >
      <header className="flex justify-between items-center p-4 pl-3 pb-0">
        <Link
          to={`/user/${post.userId.username}`}
          className="flex gap-3 cursor-pointer group"
        >
          <img
            src={post.userId.avatarUrl}
            alt={post.userId.displayName}
            className="w-11 h-11 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h5 className=" font-semibold group-hover:underline">
                {post.userId.displayName}
              </h5>
              {post.userId.verified && (
                <BadgeCheck size={17} className="text-sky-500" />
              )}
              {post.userId._id === userData?._id && (
                <span className="text-xs text-gray-color">(Tú)</span>
              )}
            </div>
            <div className="flex gap-1 text-xs text-gray-color">
              <span>@{post.userId.username}</span>
              <span className="select-none">•</span>
              <span className="select-none">{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </Link>

        <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer">
          <Ellipsis size={19} />
        </button>
      </header>

      {/* contenido */}
      <article className="p-4 flex flex-col gap-3">
        <p className="line-clamp-6">{post.content}</p>
        <div className="max-h-120 w-full flex justify-center items-center">
          {/* {post.images && (
            <img
              src={post.images[0]}
              alt={`image ${post.images[0]}`}
              className="rounded-xl object-contain h-auto w-auto max-h-110 max-w-full"
            />
          )} */}
          {post.images?.length > 0 && (
            <div className="relative w-full h-100 max-w-full flex items-center justify-center ">
              <img
                src={post.images[currentIndexImage]}
                alt={`image ${post.images[currentIndexImage]}`}
                className="rounded-xl object-contain max-w-full max-h-full w-auto h-auto mx-auto"
              />
              <footer className="absolute bottom-5 flex gap-2">
                <div className="flex gap-2 bg-black/50 rounded-full p-1 items-center backdrop-blur-sm">
                  <button
                    onClick={handlePrevImage}
                    className="cursor-pointer hover:bg-gray-color/50 rounded-full p-1 duration-100"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <p className="text-white text-sm select-none">
                    {currentIndexImage + 1}/{post.images.length}
                  </p>
                  <button
                    onClick={handleNextImage}
                    className="cursor-pointer hover:bg-gray-color/50 rounded-full p-1 duration-100"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </footer>
            </div>
          )}
        </div>

        {/* <div className="max-h-120 w-full flex justify-center items-center">
              <img
                src={post.image}
                alt="asd"
                className="rounded-xl object-contain h-auto w-auto max-h-110 max-w-full"
              />
            </div> */}
      </article>

      <footer className="flex justify-between items-center p-4 pl-2 pt-0">
        <div className="flex gap-2">
          <button
            onClick={() => handleLikePost()}
            className="py-1 px-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center"
          >
            <Heart
              style={{
                fill: isLikedByUser(),
                color: isLikedByUser(),
              }}
              size={19}
            />
            <span>{likeCount}</span>
          </button>
          <button className="py-1 px-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
            <ThumbsDown size={19} />
            <span>{post.dislikes.length}</span>
          </button>
          <button className="py-1 px-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
            <MessageCircle size={19} />
            <span>{post.comments.length}</span>
          </button>
        </div>
        <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
          <Bookmark size={19} />
        </button>
      </footer>
    </section>
  );
};
