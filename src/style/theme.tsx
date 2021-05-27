import { DEVICE_SIZES } from '../constants'

export interface Theme {
  backgroundColor: string
  backgroundButtonColor: string
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
  textShadow: {
    mobileXS: string
    default: string
  }
}

export const theme: Theme = {
  backgroundColor: 'rgb(180, 220, 220)',
  backgroundButtonColor: 'rgb(100,150,160)',
  deviceSizes: {
    mobileXS: DEVICE_SIZES.mobileXS + 'px',
    mobile: DEVICE_SIZES.mobile + 'px',
    mobileXL: DEVICE_SIZES.mobileXL + 'px',
    tablet: DEVICE_SIZES.tablet + 'px',
    laptop: DEVICE_SIZES.laptop + 'px',
    desktop: DEVICE_SIZES.desktop + 'px',
  },
  linkHoverColor: 'rgb(140,180,190)',
  specialTextColor: '#ff6961',
  textShadow: {
    mobileXS: '0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff',
    default: '0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff',
  },
}
