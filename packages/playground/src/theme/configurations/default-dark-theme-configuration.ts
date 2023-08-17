import { ThemeConfiguration } from "../../types";

import { DefaultSizesConfiguration } from "./default-sizes-configuration";

export const DefaultDarkThemeConfiguration: ThemeConfiguration = {
  constants: {
    backgroundAlpha: 0.1,
  },
  colors: {
    main: [23, 23, 23],
    mainHover: [27, 27, 27],
    mainActive: [31, 31, 31],
    mainContrast: [45, 45, 45],
    border: [54, 54, 54],
    text: [255, 255, 255],
    textContrast: [195, 195, 195],
    textPrimary: [88, 143, 239],
    textInfo: [136, 190, 253],
    textWarning: [231, 157, 54],
    textDanger: [236, 75, 104],
    textSuccess: [46, 198, 149],
    primary: [49, 105, 201],
    info: [88, 153, 229],
    warning: [166, 104, 17],
    danger: [198, 46, 74],
    success: [12, 156, 110],
  },
  sizes: DefaultSizesConfiguration,
};
