import { ModalProps } from "..";
import RoughWrap from "../../roughWrap";

export const ModalBackground: React.FC<
  Pick<ModalProps, "children" | "onClose">
> = ({ children, onClose }) => {
  return (
    <RoughWrap
      //   onClick={onClose}
      customElement="div"
      className="Modal-modalBackground flex justify-center items-center"
      contentClassName="Modal-modalBackground__content "
      children={children}
    />
  );
};
