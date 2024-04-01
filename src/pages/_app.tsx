import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import Layout from "@/components/Layout/Layout";
import { layoutRoutes } from "@/const/pages";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/themes";

export default function App({ Component, pageProps }: AppProps) {
  const [showLayout, setShowLayout] = useState<boolean>(false);
  const { asPath } = useRouter();

  useEffect(() => {
    if (layoutRoutes.includes(asPath)) setShowLayout(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Layout showLayout={showLayout}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ThemeProvider>
  )
}
