import imageComingSoon from "@/assets/coming-soon.webp";

export const StartToChat = () => {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center">
      <img src={imageComingSoon} alt="imagen" className="w-75 select-none" />
      <h1 className="text-2xl font-bold text-center">
        Parece que no hay nadie para hablar. <br />
        Busca un usuario para iniciar una conversación.
      </h1>
    </main>
  );
};
