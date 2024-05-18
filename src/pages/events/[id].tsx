import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, TitlePageId, TitleId, Main } from '../../styles/pages/events/style';
import { Button, Spinner, Table, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import EventoDetails from '@/components/Modals/ModalEvents';

interface Evento {
    data: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        description: number;
    }
}

// interface SubEvento {
//     data: {
//         id: number;
//         name: string;
//         start_date: string;
//         end_date: string;
//         description: string;
//     }
// }

const EventoDetailsPage: React.FC = () => {
    const [evento, setEvento] = useState<Evento | null>(null);
    // const [subEventos, setSubEventos] = useState<SubEvento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar a abertura do modal
    const router = useRouter();
    const { id } = router.query;

    // console.log(subEventos, "oi")

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    return;
                }

                setLoading(true);
                const response = await axios.get(`https://unicap-events-backend.vercel.app/event/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvento(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar detalhes do evento:', error);
                setLoading(false);
            }
        };

        // const fetchSubEventos = async () => {
        //     try {
        //         const token = localStorage.getItem('accessToken');
        //         if (!token) {
        //             return;
        //         }

        //         setLoading(true);
        //         const response = await axios.get(`https://unicap-events-backend.vercel.app//sub-event/`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });
        //         setSubEventos(response.data);
        //         setLoading(false);
        //     } catch (error) {
        //         console.error('Ocorreu um erro ao buscar os sub-eventos:', error);
        //         setLoading(false);
        //     }
        // };


        if (id) {
            fetchEvento();
            // fetchSubEventos();
        }
    }, [id]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading || !evento) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner
                    thickness='10px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    width={150}
                    height={150}
                    color='red.500' />
            </Flex>
        );
    }

    return (
        <>
            <Head>
                <title>{evento.data.name} | Detalhes do Evento</title>
                <meta name="description" content="Detalhes do Evento" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <div>

                        <TitlePageId>
                            <TitleId>
                                {evento.data.name}
                            </TitleId>
                            <p>Data e Hora Inicial: {format(new Date(evento.data.start_date), 'dd/MM/yyyy')}</p>
                            <p>Data e Hora Final: {format(new Date(evento.data.end_date), 'dd/MM/yyyy')}</p>
                            <p>Descrição: {evento.data.description}</p>
                        </TitlePageId>
                        <Button bg="#6A0014" color="white" _hover={{ bg: 'red.500' }} onClick={handleOpenModal}>Editar evento</Button>
                    </div>
                    {/* <div>
                        <Table variant='striped' colorScheme='gray'>
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th>Data Inicial</Th>
                                    <Th>Data Final</Th>
                                    <Th>Descrição</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {subEventos.map(subEvento => (
                                    <Tr key={subEvento.data.id}>
                                        <Td>{subEvento.data.name}</Td>
                                        <Td>{format(new Date(subEvento.data.start_date), 'dd/MM/yyyy')}</Td>
                                        <Td>{format(new Date(subEvento.data.end_date), 'dd/MM/yyyy')}</Td>
                                        <Td>{subEvento.data.description}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div> */}
                </Container>
            </Main>
            {/* Renderize o modal apenas quando o estado isModalOpen for true */}
            {isModalOpen && <EventoDetails eventId={Number(id)} onClose={handleCloseModal} />}
        </>
    );
};

export default EventoDetailsPage;
