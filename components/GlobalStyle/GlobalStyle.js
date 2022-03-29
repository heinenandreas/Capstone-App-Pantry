import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Fredoka', sans-serif;
      box-sizing: border-box;
      --darkblue: #2d2861;
      --lightblue: #7271B3;
      --orange: #fe7902;
      --lightyellow: #fcc13f;
      --green: #2AA04B;
      --lightgreen: #8ad234;
      --pink: #d6007e;
      --neonpink: #fc008b;
      margin: 0;
      color: var(--darkblue);
}
`;
