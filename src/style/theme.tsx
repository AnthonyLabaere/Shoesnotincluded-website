import { DEVICE_SIZES } from '../constants'

export const theme = {
    backgroundColor: "rgb(180, 220, 220)",
    backgroundButtonColor: "rgb(100,150,160)",
    deviceSizes: {
        mobileXS: DEVICE_SIZES.mobileXS + "px",
        mobile: DEVICE_SIZES.mobile + "px",
        mobileXL: DEVICE_SIZES.mobileXL + "px",
        tablet: DEVICE_SIZES.tablet + "px",
        laptop: DEVICE_SIZES.laptop + "px",
        desktop: DEVICE_SIZES.desktop + "px",
    },
    linkHoverColor: "rgb(140,180,190)",
    textShadow: {
        mobileXS: "0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff",
        default: "0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff, 0 0 25px #fff"
    }
}