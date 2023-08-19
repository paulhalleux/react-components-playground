import clsx from "clsx";

import { RatingSize } from "../Rating";

import styles from "./RatingStar.module.scss";

export type RatingStarProps = {
  starValue: number;
  onClick?: () => void;
  size?: RatingSize;
  active?: boolean;
  disabled?: boolean;
};

export function RatingStar({
  onClick,
  starValue,
  active,
  disabled,
  size,
}: RatingStarProps) {
  const onKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick?.();
    }
  };

  return (
    <svg
      tabIndex={starValue}
      data-value={starValue}
      viewBox="0 0 24 24"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={clsx(
        styles.star,
        {
          [styles["star--active"]]: active,
          [styles["star--disabled"]]: disabled,
        },
        styles[`star--size-${size}`],
      )}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.star__shape}
      />
    </svg>
  );
}
