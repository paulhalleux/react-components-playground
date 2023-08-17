import { ThemeConfiguration } from "../../types";

import { DefaultSizesConfiguration } from "./default-sizes-configuration";

export const DefaultLightThemeConfiguration: ThemeConfiguration = {
  constants: {
    backgroundAlpha: 0.1,
  },
  colors: {
    main: [255, 255, 255],
    mainHover: [250, 250, 250],
    mainActive: [245, 245, 245],
    mainContrast: [230, 230, 230],
    border: [220, 220, 220],
    text: [0, 0, 0],
    textContrast: [122, 122, 122],
    textPrimary: [88, 143, 239],
    textInfo: [66, 153, 255],
    textWarning: [203, 136, 42],
    textDanger: [236, 75, 104],
    textSuccess: [12, 156, 110],
    primary: [49, 105, 201],
    info: [88, 153, 229],
    warning: [166, 104, 17],
    danger: [198, 46, 74],
    success: [12, 156, 110],
  },
  sizes: DefaultSizesConfiguration,
};
