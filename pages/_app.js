import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle";
import Logo from "../components/Logo/Logo";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <Component {...pageProps} />
      <Navbar />
    </>
  );
}

export default MyApp;
