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
        font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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

    [type="checkbox"]:not(:checked), 
    [type="checkbox"]:checked {
      /* Cache la checkbox sans
        la rendre invisible aux
        lecteurs d'écran */
      position: absolute;
      left: 0;
      opacity: 0.01;
    }

    /* Preparer le label */
    [type="checkbox"]:not(:checked) + label,
    [type="checkbox"]:checked + label {
      position: relative; /* permet de positionner la checkbox */
      padding-left: 2.3em; /* place pour la box */
      font-size: 1.05em;
      line-height: 1.7;
      cursor: pointer; 
    }

    /* Aspect de la case */
    [type="checkbox"]:not(:checked) + label::before,
    [type="checkbox"]:checked + label::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1.4em;
      height: 1.4em;
      border: 1px solid #aaa;
      background: #FFF;
      border-radius: .2em;
      transition: all .275s;
    }

    /* Aspect de la coche */
    [type="checkbox"]:not(:checked) + label::after,
    [type="checkbox"]:checked + label::after {
      content: '✕';
      speak: never; /* Pour être sûr que le lecteur d'écran ne lira pas "fois" */
      position: absolute;
      top: .39em;
      left: .08em;
      font-size: 1.6em;
      color: #4cdabd;
      line-height: 0;
      transition: all .2s; /* Petite transition */
    }

    /* Aspect non cochée */
    [type="checkbox"]:not(:checked) + label::after {
      opacity: 0;
      transform: scale(0) rotate(45deg);
    }

    /* Aspect cochée */
    [type="checkbox"]:checked + label::after {
      opacity: 1;
      transform: scale(1) rotate(0);
    }

    /* Disabled checkbox */
    [type="checkbox"]:disabled:not(:checked) + label::before,
    [type="checkbox"]:disabled:checked + label::before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #e9e9e9;
    }

    /* Disabled checked */
    [type="checkbox"]:disabled:checked + label::after {
      color: #777;
    }

    [type="checkbox"]:disabled + label {
      color: #aaa;
    }
`
