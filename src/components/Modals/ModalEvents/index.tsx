import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';

interface Evento {
    data: {
        id: number;
        nome: string;
        data: string;
        descricao: string;
        capacidade: number;
        categoria: string;
    }
}

interface EventoDetailsProps {
    eventId: number | null;
    onClose: () => void;
}

const EventoDetails: React.FC<EventoDetailsProps> = ({ eventId, onClose }) => {
    const [evento, setEvento] = useState<Evento | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Adicionando estado para controlar o carregamento

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    // Se o token não estiver disponível, faça algo, como redirecionar para a tela de login
                    return;
                }

                setLoading(true); // Ativando o estado de carregamento
                const response = await axios.get(`https://unicap-events.vercel.app/eventos/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adicione o token de autenticação ao cabeçalho
                    },
                });
                setEvento(response.data);
                setLoading(false); // Desativando o estado de carregamento após o término da requisição
            } catch (error) {
                console.error('Ocorreu um erro ao buscar detalhes do evento:', error);
                setLoading(false); // Desativando o estado de carregamento em caso de erro
            }
        };

        if (eventId) {
            fetchEvento();
        }
    }, [eventId]);

    // useEffect para redefinir o estado quando o eventId mudar
    useEffect(() => {
        return () => {
            setEvento(null); // Resetando o estado quando o modal for fechado
        };
    }, [eventId]);

    // Função para salvar as alterações no evento
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            const dataToSend = {
                nome: evento.data.nome,
                data: evento.data.data,
                descricao: evento.data.descricao,
                capacidade: evento.data.capacidade,
                categoria: evento.data.categoria
            };

            setLoading(true); // Ativando o estado de carregamento durante a requisição
            await axios.put(`https://unicap-events.vercel.app/eventos/${evento.data.id}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false); // Desativando o estado de carregamento após a requisição

            // Aqui você pode adicionar alguma lógica adicional, como uma mensagem de sucesso

            onClose(); // Fecha o modal após salvar as alterações
        } catch (error) {
            console.error('Ocorreu um erro ao salvar as alterações do evento:', error);
            setLoading(false); // Desativando o estado de carregamento em caso de erro
            // Aqui você pode adicionar alguma lógica para lidar com o erro, como exibir uma mensagem de erro
        }
    };

    // Função para excluir o evento
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            setLoading(true); // Ativando o estado de carregamento durante a requisição
            await axios.delete(`https://unicap-events.vercel.app/eventos/${evento.data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false); // Desativando o estado de carregamento após a requisição

            // Aqui você pode adicionar alguma lógica adicional, como uma mensagem de sucesso

            onClose(); // Fecha o modal após excluir o evento
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o evento:', error);
            setLoading(false); // Desativando o estado de carregamento em caso de erro
            // Aqui você pode adicionar alguma lógica para lidar com o erro, como exibir uma mensagem de erro
        }
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
                            <Spinner size="xl" color="yellow.500" />
                        </Flex>
                    ) : (
                        evento ? (
                            <div>
                                <p><strong>Nome:</strong> <Input name="nome" value={evento.data.nome} marginTop="20px" /></p>
                                <p><strong>Data:</strong> <Input name="data" value={format(new Date(evento.data.data), 'dd/MM/yyyy')} marginTop="20px" /></p>
                                <p><strong>Descrição:</strong> <Input name="descricao" value={evento.data.descricao ?? ''} marginTop="20px" /></p>
                                <p><strong>Capacidade:</strong> <Input name="capacidade" value={evento.data.capacidade ?? ''} marginTop="20px" /></p>
                                <p><strong>Categoria:</strong> <Input name="categoria" value={evento.data.categoria} marginTop="20px" /></p>
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
