import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "styled-components";

const GlobalStyles = createGlobalStyle<DefaultTheme>`
  body {
    color: ${(props) => props.colors.primary};
    background-color: ${(props) => props.colors.background};
  }

`;

export default GlobalStyles;
