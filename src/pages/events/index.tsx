import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import { Container, TitlePage, Title, ButtonWrapper, Main } from '../../styles/pages/events/style';
import { format } from 'date-fns';
import ModalCreateEvents from '@/components/Modals/ModalCreateEvents';

interface Evento {
    id: number;
    name: string;
    start_date: string;
    description: number;
}

export default function Events() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const expiration = localStorage.getItem('expiration');

        // Verifica se o token existe e não está expirado
        if (!token || !expiration || new Date(expiration) <= new Date()) {
            // Redireciona para a página de login se o token não existir ou estiver expirado
            router.push('/login');
        } else {
            // Busca eventos se o token for válido
            fetchEventos(token);
        }
    }, []);

    const fetchEventos = async (token: string) => {
        setLoading(true);
        try {
            const response = await axios.get('https://unicap-events-back-end.vercel.app/event/', {
                headers: {
                    Authorization: `Bearer ${token}` // Inclui o token no cabeçalho da solicitação
                }
            });
            if (Array.isArray(response.data)) {
                setEventos(response.data);
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            // Redireciona para a página de login em caso de erro na solicitação
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleEventoClick = (eventId: number) => {
        router.push(`/events/${eventId}`);
    };

    const handleOpenModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const handleCloseModalCreate = () => {
        setIsModalCreateOpen(false);
    };

    const handleUpdateEvents = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchEventos(token);
        }
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
                        <Title>
                            Gerenciamento de Eventos
                        </Title>
                        <ButtonWrapper>
                            <Button bg="#6A0014" color="white" _hover={{ bg: 'red.500' }} onClick={handleOpenModalCreate}>+ <span>Adicionar evento</span></Button>
                        </ButtonWrapper>
                    </TitlePage>

                    <TableContainer>
                        {loading ? (
                            <Flex justify="center" align="center" height="600px">
                                <Spinner
                                    thickness='10px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    width={150}
                                    height={150}
                                    color='red.500'
                                />
                            </Flex>
                        ) : (
                            <Table variant='simple' colorScheme='red'>
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

                    <ModalCreateEvents isOpen={isModalCreateOpen} onClose={handleCloseModalCreate} onUpdateEvents={handleUpdateEvents} />
                </Container>
            </Main>
        </>
    );
}
