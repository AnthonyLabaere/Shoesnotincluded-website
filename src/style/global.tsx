import { createGlobalStyle } from 'styled-components'

import oxygenBold from '../assets/fonts/Oxygen-Bold.ttf'
import oxygenLight from '../assets/fonts/Oxygen-Light.ttf'
import oxygenRegular from '../assets/fonts/Oxygen-Regular.ttf'

export const GlobalStyles = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap");
 
    @font-face {
        font-family: 'Oxygen-Bold';
        src: local('Oxygen-Bold'), url(${oxygenBold}) format('truetype');
    }
    @font-face {
        font-family: 'Oxygen-Light';
        src: local('Oxygen-Light'), url(${oxygenLight}) format('truetype');
    }
    @font-face {
        font-family: 'Oxygen-Regular';
        src: local('Oxygen-Regular'), url(${oxygenRegular}) format('truetype');
    }

    html,
    body {
        width: 100%;
        height: 100%;
    }

    * {
    box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: "Oxygen", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-weight: "bold";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, monospace;
    }

    a {
        text-decoration: none;
    }

    textarea, input, button, select { 
        font-family: inherit;
        font-size: inherit;
    }
`
