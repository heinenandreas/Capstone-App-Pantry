import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle";
import Logo from "../components/Logo/Logo";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Logo />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
