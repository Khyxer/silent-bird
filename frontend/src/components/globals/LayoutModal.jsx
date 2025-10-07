export const LayoutModal = ({ children, show, onClose, className }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {show && (
        <main className="w-full h-full fixed z-999 top-0 left-0 flex items-center justify-center">
          <div
            className="bg-dark-color/50 backdrop-blur-[3px] w-full h-full absolute top-0 left-0 z-997"
            onClick={handleClose}
          ></div>
          <div
            className={`bg-dark-color border border-gray-color/20 p-6 rounded-lg z-998 ${className} 
            ${show ? "scale-100" : "scale-0"} duration-200`}
          >
            {children}
          </div>
        </main>
      )}
    </>
  );
};
