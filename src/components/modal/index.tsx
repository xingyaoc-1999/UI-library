import { ReactNode } from "react";
import RoughWrap from "../roughWrap";

interface ModalBodyProps {
  // visible: boolean;
  // mask?: boolean;
  maskClosable?: boolean;
  children: ReactNode;
  // onClose: () => void;
}

export const Modal: React.FC<ModalBodyProps> = ({
  // mask,
  // visible,
  children,
}) => {
  return (
    <RoughWrap
      customElement="div"
      className=" Modal-modal "
      contentClassName="grid Modal-modal__content"
    >
      {children}
    </RoughWrap>
  );
};
