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
      --lightorange: #ffebd9;
      margin: 0;
      color: var(--darkblue);
}


.Collapsible{
background-color: var(--lightgreen);
width: 95vw;
border-radius: 0 20px 0 0;
padding: 1rem 0 0 0; 
cursor: pointer;
border-bottom: 3px solid var(--green);
transition: 0.7s;

&:hover {
    background-color: var(--lightorange);
  }

}

.Collapsible__trigger {
  font-size: 1.6rem;
  margin: 0;
  padding-left: 0.5rem;
  color: var(--darkblue);
}

`;
