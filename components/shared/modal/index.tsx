import ModalAnimation from "@/components/serviette-ui/modal-animation";
import { ChevronRightCircle, CircleX, X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <ModalAnimation>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <ChevronRightCircle
                fill="#373636"
                className="md:block hidden w-8 h-8"
              />
              <CircleX fill="#373636" className="md:hidden block w-8 h-8" />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </ModalAnimation>
  );
};

export default Modal;