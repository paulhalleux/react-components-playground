import { RecursivePartial } from "./helpers";

export type ColorTriplet =
  | [number, number, number]
  | [number, number, number, number];

export type Color = string | ColorTriplet;

export type ThemeConfiguration = RecursivePartial<{
  colors: ThemeConfigurationColors;
  sizes: {
    padding: ThemeConfigurationPadding;
    borderRadius: ThemeConfigurationBorderRadius;
    fontSize: ThemeConfigurationFontSizes;
  };
}>;

export type ThemeConfigurationPadding = {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type ThemeConfigurationBorderRadius = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type ThemeConfigurationFontSizes = {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type ThemeConfigurationColorsBase = {
  main: Color;
  mainHover: Color;
  mainActive: Color;
  mainContrast: Color;
  mainTertiary: Color;
  border: Color;
  borderContrast: Color;
  borderPrimary: Color;
  text: Color;
  textContrast: Color;
  primary: Color;
  info: Color;
  success: Color;
  warning: Color;
  danger: Color;
};

export type ThemeConfigurationColors = {
  light: ThemeConfigurationColorsBase;
  dark: ThemeConfigurationColorsBase;
};
