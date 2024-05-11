import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { TitlePageHome, MainHome } from "@/styles/pages/events/style";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Humanitas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHome className={`${styles.main} ${inter.className}`}>
        <TitlePageHome className={`${styles.h1}`}>
          Bem vindo ao unicap events!
        </TitlePageHome>
      </MainHome>
    </>
  );
}

