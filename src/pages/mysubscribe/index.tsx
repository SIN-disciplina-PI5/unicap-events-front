import React from 'react';
import Head from 'next/head';
import { Container, TitlePage, Title, Main } from '../../styles/pages/events/style';

export default function Mysubscribe() {

    return (
        <>
            <Head>
                <title>Humanitas | Eventos</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <TitlePage>
                        <Title>
                            Minhas inscrições
                        </Title>
                        </TitlePage>
                </Container>
            </Main>
        </>
    );
}