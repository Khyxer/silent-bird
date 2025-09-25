import { useRef } from "react";
import { House, File, TrendingUp } from "lucide-react";

export const NavMenuMainPage = ({ navMenu }) => {
  const refBg = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = e.currentTarget.getBoundingClientRect();

    const leftPosition = itemRect.left - containerRect.left;
    refBg.current.style.left = `${leftPosition}px`;
    refBg.current.style.width = `${itemRect.width}px`;
    refBg.current.style.top = "0px";
    refBg.current.style.height = `${itemRect.height}px`;

    refBg.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    refBg.current.style.opacity = "0";
  };

  return (
    <ul className={`flex relative`} ref={containerRef}>
      <div
        className="border rounded-full absolute opacity-0 transition-all ease-in-out duration-300 pointer-events-none z-10"
        ref={refBg}
      ></div>
      {navMenu.map((item) => (
        <li key={item.label} className="z-20 relative ">
          <a
            href={item.href}
            // className={`flex items-center gap-2 px-4 py-2 h-10 transition-colors duration-200 hover:text-white`}
            className="group inline-flex h-10 gap-2 w-max items-center justify-center rounded-md px-4 font-medium hover:text-light-color text-gray-color duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <item.icon size={17} />
            <p>{item.label}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};
