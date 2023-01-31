import { ModalBackground } from "./modalBackground";
import { ModalBody } from "./modalBody";

export interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ visible, children, onClose }) => {
  return visible ? (
    <ModalBackground onClose={onClose}>
      <ModalBody children={children} />
    </ModalBackground>
  ) : null;
};
