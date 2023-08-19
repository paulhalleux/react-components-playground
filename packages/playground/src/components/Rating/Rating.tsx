import clsx from "clsx";

import { BaseProps } from "../../types";

import { RatingStar } from "./RatingStar";

import styles from "./Rating.module.scss";

export type RatingSize = "small" | "medium" | "large";
export type RatingProps = {
  /**
   * The id of the hidden input element.
   */
  id?: string;
  /**
   * The name of the hidden input element.
   */
  name?: string;
  /**
   * The number of stars to display.
   */
  stars?: number;
  /**
   * The size of the rating.
   */
  size?: RatingSize;
  /**
   * The value of the rating.
   */
  value?: number;
  /**
   * The callback to call when the value changes.
   */
  onChange?: (value: number) => void;
  /**
   * Whether the rating is disabled.
   */
  disabled?: boolean;
} & BaseProps;

export function Rating({
  id,
  name,
  stars = 5,
  disabled,
  value,
  onChange,
  size = "medium",
  className,
  ...rest
}: RatingProps) {
  const onStarClick = (starValue: number) => {
    if (disabled) return;
    if (starValue === value && value !== 0) {
      onChange?.(0);
    } else onChange?.(starValue);
  };

  return (
    <div
      className={clsx(
        styles.star__container,
        {
          [styles["star__container--disabled"]]: disabled,
        },
        className,
      )}
      {...rest}
    >
      <input type="hidden" name={name} value={value} id={id} readOnly />
      {Array.from({ length: stars }).map((_, index) => (
        <RatingStar
          starValue={stars - index}
          key={index}
          active={value ? value >= stars - index : false}
          onClick={() => onStarClick(stars - index)}
          disabled={disabled}
          size={size}
        />
      ))}
    </div>
  );
}
