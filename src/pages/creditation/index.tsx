import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import { Container, TitlePage, Title, Main } from '../../styles/pages/events/style';
import { format } from 'date-fns';

interface Evento {
    id: number;
    name: string;
    start_date: string;
    description: string;
}

export default function Acreditation() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const expiration = localStorage.getItem('expiration');

        if (!token || !expiration || new Date(expiration) <= new Date()) {
            router.push('/login');
        } else {
            fetchEventos(token);
        }
    }, []);

    const fetchEventos = async (token: string) => {
        setLoading(true);
        try {
            const response = await axios.get('https://unicap-events-backend-two.vercel.app/event/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data)) {
                setEventos(response.data);
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleEventoClick = (eventId: number) => {
        router.push(`/creditation/${eventId}`);
    };

    return (
        <>
            <Head>
                <title>Unicap Events | Eventos</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <TitlePage>
                        <Title>Credenciamento de Eventos</Title>
                    </TitlePage>

                    <TableContainer>
                        {loading ? (
                            <Flex justify="center" align="center" height="600px">
                                <Spinner
                                    thickness="10px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    width={150}
                                    height={150}
                                    color="red.500"
                                />
                            </Flex>
                        ) : (
                            <Table variant="simple" colorScheme="red">
                                <TableCaption>Tabela de Eventos</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Nome</Th>
                                        <Th>Dia</Th>
                                        <Th>Descrição</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {eventos.map(evento => (
                                        <Tr
                                            key={evento.id}
                                            onClick={() => handleEventoClick(evento.id)}
                                            style={{ cursor: 'pointer' }}
                                            _hover={{ bg: 'red.100', boxShadow: 'md' }}
                                        >
                                            <Td>{evento.name}</Td>
                                            <Td>{format(new Date(evento.start_date), 'dd/MM/yyyy')}</Td>
                                            <Td>{evento.description}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </TableContainer>
                </Container>
            </Main>
        </>
    );
}
