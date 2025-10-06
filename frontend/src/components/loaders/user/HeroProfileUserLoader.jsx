import React from "react";

export const HeroProfileUserLoader = () => {
  return (
    <main className="border border-gray-color/50 rounded-lg overflow-hidden">
      <header className="w-full h-[248px] relative">
        <div className="w-full h-full bg-gray-color/20 opacity-80 absolute top-0 left-0 -z-10 animate-pulse"></div>
        <div className="p-6 mx-auto h-full flex items-end">
          <div className="w-28 h-28 rounded-full bg-gray-color/50 animate-pulse z-10"></div>
        </div>
      </header>
      <footer className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="w-32 h-6 bg-gray-color/50 animate-pulse rounded"></div>
            <div className="w-24 h-5 bg-gray-color/50 animate-pulse rounded mt-2"></div>
          </div>
          <div className="w-24 h-9 bg-gray-color/50 animate-pulse rounded-full"></div>
        </div>
      </footer>
    </main>
  );
};
