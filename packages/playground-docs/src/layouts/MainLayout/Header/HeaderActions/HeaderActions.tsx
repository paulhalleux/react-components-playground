import {
  Anchor,
  Button,
  GithubIcon,
  MoonIcon,
  SunIcon,
  ThemeType,
  useTheme,
} from "@paulhalleux/react-playground";

import styles from "./HeaderActions.module.scss";

export function HeaderActions() {
  const { theme, setTheme } = useTheme();

  const onThemeChange = () => {
    if (theme === ThemeType.Dark) {
      setTheme(ThemeType.Light);
    } else {
      setTheme(ThemeType.Dark);
    }
  };

  return (
    <div className={styles.actions__container}>
      <Anchor
        variant="secondary"
        to="https://github.com/paulhalleux/react-playground"
        target="_blank"
      >
        <GithubIcon height={20} width={20} />
      </Anchor>
      <Button.Icon
        onClick={onThemeChange}
        ghost
        icon={theme === ThemeType.Light ? MoonIcon : SunIcon}
        iconSize={20}
      />
    </div>
  );
}
