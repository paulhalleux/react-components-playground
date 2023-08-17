import { RecursivePartial } from "./helpers";

export type Color = [number, number, number];

export type ThemeConfiguration = RecursivePartial<{
  colors: ThemeConfigurationColors;
  constants: ThemeConfigurationConstants;
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
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type ThemeConfigurationColors = {
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
  textPrimary: Color;
  textInfo: Color;
  textWarning: Color;
  textDanger: Color;
  textSuccess: Color;
  primary: Color;
  info: Color;
  success: Color;
  warning: Color;
  danger: Color;
};

export type ThemeConfigurationConstants = {
  backgroundAlpha: number;
};
