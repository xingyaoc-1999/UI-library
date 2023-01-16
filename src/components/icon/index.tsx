type IconType = (props: IconBaseProps) => JSX.Element;

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export interface IconProps {
  item: IconType;
  width?: number;
  height?: number;
  clasName?: string;
}

export const Icon = ({ width = 24, height = 24 }) => {
  return (
    <ReactRough
      width={width}
      height={height}
      type="svg"
    >
        <Path />
    </ReactRough>
  );
};
