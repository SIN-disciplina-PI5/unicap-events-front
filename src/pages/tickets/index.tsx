import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import { Container, TitlePage, Title, ButtonWrapper, Main } from '../../styles/pages/events/style';
import { format } from 'date-fns';
import EventoDetails from '@/components/Modals/ModalEvents';
import ModalCreateEvents from '@/components/Modals/ModalCreateEvents';

interface Evento {
    id: number;
    nome: string;
    data: string;
    capacidade: number;
    categoria: string;
}

export default function Events() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
        } else {
            fetchEventos();
        }
    }, []);

    const fetchEventos = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://unicap-events.vercel.app/ingressos', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (Array.isArray(response.data.data)) {
                setEventos(response.data.data);
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEventoClick = (eventId: number) => {
        setSelectedEventId(eventId);
    };

    const handleCloseEventoDetails = () => {
        setSelectedEventId(null);
    };

    const handleOpenModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const handleCloseModalCreate = () => {
        setIsModalCreateOpen(false);
    };

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
                            Gerenciamento de Eventos
                        </Title>
                        <ButtonWrapper>
                            <Button colorScheme='yellow' onClick={handleOpenModalCreate}>+ <span>Adicionar evento</span></Button>
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
                                    color='yellow.500' />
                            </Flex>
                        ) : (
                            <Table variant='striped' colorScheme='gray'>
                                <TableCaption>Tabela de Eventos</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Nome</Th>
                                        <Th>Dia</Th>
                                        <Th>Capacidade</Th>
                                        <Th>Categoria</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {eventos.map(evento => (
                                        <Tr key={evento.id} onClick={() => handleEventoClick(evento.id)}>
                                            <Td>{evento.nome}</Td>
                                            <Td>{evento.capacidade}</Td>
                                            <Td>{evento.categoria}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </TableContainer>

                    <EventoDetails eventId={selectedEventId} onClose={handleCloseEventoDetails} />
                    <ModalCreateEvents isOpen={isModalCreateOpen} onClose={handleCloseModalCreate} />
                </Container>
            </Main>
        </>
    );
}
