import * as Constants from '../constants'

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
  filter: {
    mobileXS: string
    default: string
  }
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
  filter: {
    mobileXS: 'drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) ',
    default: 'drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff) drop-shadow(0 0 2rem #fff)',
  },
}
