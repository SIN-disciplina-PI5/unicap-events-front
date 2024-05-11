import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Spinner, Flex } from '@chakra-ui/react';
import { Container, TitlePage, Title, Main } from '../../styles/pages/events/style';
import { format } from 'date-fns';

interface Evento {
    data: {
        id: number;
        name: string;
        start_date: string;
        description: number;
    }
}

const EventoDetailsPage: React.FC = () => {
    const [evento, setEvento] = useState<Evento | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    return;
                }

                setLoading(true);
                const response = await axios.get(`${process.env.BACKEND_URL}/event/${id}`, {
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

        if (id) {
            fetchEvento();
        }
    }, [id]);

    const handleUpdateEvento = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            setLoading(true);
            await axios.put(`${process.env.BACKEND_URL}/event/${id}`, evento, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            // Se necessário, adicione lógica para notificar o usuário sobre a atualização bem-sucedida
        } catch (error) {
            console.error('Ocorreu um erro ao atualizar o evento:', error);
            setLoading(false);
            // Se necessário, adicione lógica para lidar com o erro
        }
    };

    const handleDeleteEvento = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !id) {
                return;
            }

            setLoading(true);
            await axios.delete(`${process.env.BACKEND_URL}/event/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            // Se necessário, adicione lógica para notificar o usuário sobre a exclusão bem-sucedida
            router.push('/'); // Redireciona para a página inicial após a exclusão
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o evento:', error);
            setLoading(false);
            // Se necessário, adicione lógica para lidar com o erro
        }
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
                    <TitlePage>
                        <Title>{evento.data.name}</Title>
                        <p>{format(new Date(evento.data.start_date), 'dd/MM/yyyy')}</p>
                        <p>{evento.data.description}</p>
                    </TitlePage>
                    <button onClick={handleUpdateEvento}>Atualizar</button>
                    <button onClick={handleDeleteEvento}>Excluir</button>
                </Container>
            </Main>
        </>
    );
};

export default EventoDetailsPage;
