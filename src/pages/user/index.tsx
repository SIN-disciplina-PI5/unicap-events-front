import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Button } from '@chakra-ui/react'
import { Container, TitlePage, Title, ButtonWrapper } from '../../styles/pages/user/style';

interface Evento {
    id: number;
    nome: string;
    data: string;
    capacidade: number;
    categoria: string;
}

export default function User() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // Se não houver token, redirecionar para a tela de login
            router.push('/login');
        }
    }, []);


    return (
        <>
            <Head>
                <title>Humanitas | Usuários</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Container>
                    <TitlePage>
                        <Title>
                            Gerenciamento de usuários
                        </Title>
                        <ButtonWrapper>
                            <Button colorScheme='yellow'>+ <span>Adicionar usuário</span></Button>
                        </ButtonWrapper>
                    </TitlePage>

                </Container>
            </main>
        </>
    );
}
