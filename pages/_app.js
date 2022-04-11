import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { GlobalStyle } from "../components/GlobalStyle/GlobalStyle";
import Navbar from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
            refreshInterval: 3000,
          }}
        >
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
          <Navbar />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default MyApp;
