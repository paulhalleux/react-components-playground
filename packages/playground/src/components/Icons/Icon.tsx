import { IconList } from "./icon-list";
import sprite from "./sprite.svg";

export type IconProps = {
  /**
   * The size of the icon in pixels.
   */
  size?: number;
  /**
   * The class name of the icon.
   */
  className?: string;
  /**
   * The name of the icon.
   */
  name: keyof typeof IconList;
} & React.SVGProps<SVGSVGElement>;

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg height={size} width={size} className={className} {...rest}>
      <use href={`${sprite}#${name}`} />
    </svg>
  );
}
