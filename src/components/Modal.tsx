import { FaTimes } from "react-icons/fa";

type ModalProps = {
  title: string;
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ title, show, handleClose, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 bg-black/60 backdrop-blur-md"
      aria-modal
      aria-hidden={show}
    >
      <div className="relative left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md bg-dark-700 text-white">
        <header className="my-4 p-4">
          <h1 className="text-xl font-bold capitalize">{title}</h1>
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
