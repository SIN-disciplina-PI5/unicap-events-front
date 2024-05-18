import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';

interface Evento {
    data: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        description: string; // Corrigido para string
    }
}

interface EventoDetailsProps {
    eventId: number | null;
    onClose: () => void;
}

const EventoDetails: React.FC<EventoDetailsProps> = ({ eventId, onClose }) => {
    const [evento, setEvento] = useState<Evento | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    return;
                }

                setLoading(true);
                const response = await axios.get(`https://unicap-events-backend.vercel.app/event/${eventId}`, {
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

        if (eventId) {
            fetchEvento();
        }
    }, [eventId]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            setLoading(true);
            await axios.put(`https://unicap-events-backend.vercel.app//event/${evento.data.id}`, evento.data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);

            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao salvar as alterações do evento:', error);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            setLoading(true);
            await axios.delete(`https://unicap-events-backend.vercel.app//event/${evento.data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);

            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o evento:', error);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvento((prevState: any) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [name]: value,
            }
        }));
    };

    return (
        <Modal isOpen={!!eventId} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Detalhes do Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <Flex justify="center" align="center" height="60px">
                            <Spinner size="xl" color="red.500" />
                        </Flex>
                    ) : (
                        evento ? (
                            <div>
                                <p><strong>Nome:</strong> <Input name="name" value={evento.data.name} onChange={handleChange} marginTop="20px" /></p>
                                <p><strong>Data e Hora Inicial:</strong> <Input name="start_date" value={format(new Date(evento.data.start_date), 'dd/MM/yyyy')} onChange={handleChange} marginTop="20px" /></p>
                                <p><strong>Data e Hora Final:</strong> <Input name="end_date" value={format(new Date(evento.data.end_date), 'dd/MM/yyyy')} onChange={handleChange} marginTop="20px" /></p>
                                <p><strong>Descrição:</strong> <Input name="description" value={evento.data.description} onChange={handleChange} marginTop="20px" /></p>
                            </div>
                        ) : (
                            <p>erro ao carregar</p>
                        )
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='yellow' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme='red' mr={3} onClick={handleDelete}>
                        Excluir
                    </Button>
                    <Button colorScheme='green' mr={3} onClick={handleSave}>
                        Salvar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EventoDetails;
