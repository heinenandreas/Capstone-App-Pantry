import { SessionProvider } from "next-auth/react";
import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle";
import Logo from "../components/Logo/Logo";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <Logo />
      <Component {...pageProps} />
      <Navbar />
    </SessionProvider>
  );
}

export default MyApp;
