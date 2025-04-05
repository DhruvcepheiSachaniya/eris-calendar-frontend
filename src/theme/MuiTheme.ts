import { createTheme } from "@mui/material/styles";
import GilroyRegular from "../assets/Gilroy-Regular.ttf";
import GilroySemiBold from "../assets/Gilroy-SemiBold.ttf";
import GilroyMedium from "../assets/Gilroy-Medium.ttf";
import InterRegular from "../assets/Inter-Regular.ttf";
import PoppinsMedium from '../assets/Poppins-Medium.ttf'
// import breakpoints from './breakpoints';
// import { ButtonOverides } from './Button';
import palette from "./palette";
// import typography from './typography';
const theme = createTheme({
  palette,
  typography: {
    fontFamily: "GilroyRegular, Arial, sans-serif", // Default fallback to Regular
    allVariants: {
      textTransform: "none",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "optimizeLegibility",
    },
    h1: {
      fontFamily: "GilroySemiBold", // Use SemiBold for h1
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h2: {
      fontFamily: "GilroyMedium", // Use Medium for h2
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    body1: {
      fontFamily: "GilroyRegular", // Regular for normal text
      fontWeight: 400,
      fontSize: "1.125rem",
    },
    subtitle1: {
      fontFamily: "InterRegular",
      fontWeight: 400,
      fontSize: "1.125rem",
    },
    subtitle2: {
      fontFamily: "PoppinsMedium",
      fontWeight: 500,
      fontSize: '1 rem'
    }
  },
  // breakpoints,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'GilroySemiBold';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Gilroy-SemiBold'), local('Gilroy-SemiBold'), url(${GilroySemiBold}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'GilroyMedium';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Gilroy-Medium'), local('Gilroy-Medium'), url(${GilroyMedium}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
                font-family: 'GilroyRegular';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local('Gilroy-Regular'), local('Gilroy-Regular'), url(${GilroyRegular}) format('truetype');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
        @font-face {
                font-family: 'InterRegular';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local('Inter-Regular'), local('Inter-Regular'), url(${InterRegular}) format('truetype');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
        @font-face {
        font-family: 'PoppinsMedium';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Inter-Regular'), local('Inter-Regular'), url(${PoppinsMedium}) format('truetype');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
      
            `,
    },
    // MuiButton: ButtonOverides,
    // MuiTabs: {
    // 	styleOverrides: {
    // 		indicator: {
    // 			height: '4px', // Example override for indicator height
    // 		},
    // 	},
    // },
  },
});

export default theme;
