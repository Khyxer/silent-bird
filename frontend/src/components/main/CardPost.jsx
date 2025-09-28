import React from "react";
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
} from "lucide-react";
import { useHandleActionsPost } from "@/hooks/post/useHandleActionsPost";

export const CardPost = ({ post }) => {
  const { userData } = useUser();
  const { likeCount, handleLikePost, isLikedByUser } = useHandleActionsPost({
    post,
    userData,
  });
  timeAgo(post.createdAt);

  return (
    <section
      className="w-full  border rounded-xl border-gray-color/50"
      key={post._id}
    >
      <header className="flex justify-between items-center p-4 pl-3 pb-0">
        <div className="flex gap-3 cursor-pointer group">
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
        </div>

        <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer">
          <Ellipsis size={19} />
        </button>
      </header>

      {/* contenido */}
      <article className="p-4 flex flex-col gap-3">
        <p className="line-clamp-6">{post.content}</p>

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
