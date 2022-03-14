import * as Constants from '../constants';
import * as Types from '../types';

export interface Theme {
  backgroundColor: string
  backgroundButtonColor: string
  backgroundHoverButtonColor: string
  deviceSizes: {
    mobileXS: string
    mobile: string
    mobileXL: string
    tablet: string
    laptop: string
    desktop: string
  }
  linkHoverColor: string
  specialTextColor: string
  colors: {
    reds: string[],
    turquoises: string[],
    blues: string[],
    black: string,
    grey: string,
    white: string,
    yellows: string[],
    oranges: string[],
    greens: string[],
    purples: string[],
  },
  filter: {
    mobileXS: string
    default: string
  },
  tags: {
    easy: Types.Tag,
    medium: Types.Tag,
    hard: Types.Tag,
    all: Types.Tag,
    estimatedTravelDistance: Types.Tag,
    time: Types.Tag
  };
}

export const theme: Theme = {
  backgroundColor: Constants.THEME_BLUE_COLORS[2],
  backgroundButtonColor: Constants.THEME_TURQUOISE_COLORS[0],
  backgroundHoverButtonColor: Constants.THEME_TURQUOISE_COLORS[1],
  deviceSizes: {
    mobileXS: Constants.DEVICE_SIZES.mobileXS + 'px',
    mobile: Constants.DEVICE_SIZES.mobile + 'px',
    mobileXL: Constants.DEVICE_SIZES.mobileXL + 'px',
    tablet: Constants.DEVICE_SIZES.tablet + 'px',
    laptop: Constants.DEVICE_SIZES.laptop + 'px',
    desktop: Constants.DEVICE_SIZES.desktop + 'px',
  },
  linkHoverColor: Constants.THEME_TURQUOISE_COLORS[0],
  specialTextColor: Constants.THEME_RED_COLORS[0],
  colors: {
    reds: Constants.THEME_RED_COLORS,
    turquoises: Constants.THEME_RED_COLORS,
    blues: Constants.THEME_BLUE_COLORS,
    black: Constants.THEME_BLACK_COLOR,
    grey: Constants.THEME_GREY_COLOR,
    white: Constants.THEME_WHITE_COLOR,
    yellows: Constants.THEME_YELLOW_COLORS,
    oranges: Constants.THEME_ORANGE_COLORS,
    greens: Constants.THEME_GREEN_COLORS,
    purples: Constants.THEME_PURPLE_COLORS,
  },
  filter: {
    mobileXS: 'drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) ',
    default: 'drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff)',
  },
  tags: {
    easy: {
      color: Constants.THEME_BLACK_COLOR,
      backgroundColor: Constants.THEME_GREEN_COLORS[1],
    },
    medium: {
      color: Constants.THEME_BLACK_COLOR,
      backgroundColor: Constants.THEME_ORANGE_COLORS[1],
    },
    hard: {
      color: Constants.THEME_WHITE_COLOR,
      backgroundColor: Constants.THEME_RED_COLORS[0],
    },
    all: {
      color: Constants.THEME_BLACK_COLOR,
      backgroundColor: Constants.THEME_GREEN_COLORS[1],
    },
    estimatedTravelDistance: {
      color: Constants.THEME_BLACK_COLOR,
      backgroundColor: Constants.THEME_BLUE_COLORS[0],
    },
    time: {
      color: Constants.THEME_WHITE_COLOR,
      backgroundColor: Constants.THEME_BLACK_COLOR,
    },
  }
}
