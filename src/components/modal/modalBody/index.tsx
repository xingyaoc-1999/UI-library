import RoughWrap from "../../roughWrap";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { ModifierFlags } from "typescript";
import { ModalProps } from "..";

export const ModalBody: React.FC<Pick<ModalProps, "children">> = ({
  children,
}) => {
  return (
    <RoughWrap
      customElement="div"
      className=" Modal-modalBody "
      contentClassName="grid Modal-modalBody__content"
      children={children}
    />
  );
};
