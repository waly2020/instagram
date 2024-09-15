import { IoClose } from "react-icons/io5";
const Modal = ({ isOpen, children, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-screen z-50 left-0 top-0 bg-black bg-opacity-80 flex justify-center items-center">
      {children}
      <button onClick={closeModal} className="absolute right-8 top-8 text-[30px] text-white"><IoClose/></button>
    </div>
  );
};

export default Modal;
