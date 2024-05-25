import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Spinner } from '@chakra-ui/react';
import { format } from 'date-fns';
import axios from 'axios';

interface ModalPickTicketProps {
    isOpen: boolean;
    onClose: () => void;
    subEvent: {
        id: number;
        name: string;
        description: string;
        start_date: string;
        end_date: string;
        address: {
            block: string;
            room: string;
        };
    };
}

const ModalPickTicket: React.FC<ModalPickTicketProps> = ({ isOpen, onClose, subEvent }) => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubscribe = async () => {
        console.log('handleSubscribe called'); // Log para depuração
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');

            console.log('Token:', token); // Log para depuração
            console.log('SubEventId:', subEvent.id); // Log para depuração

            if (!token) {
                console.error('Token não encontrado.');
                return;
            }

            const response = await axios.put(`https://unicap-events-back-end.vercel.app/user/subscribe/${subEvent.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Inscrição realizada com sucesso:', response.data);
            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao se inscrever no subevento:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{subEvent.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p><strong>Descrição:</strong> {subEvent.description}</p>
                    <p><strong>Data e Hora Inicial:</strong> {format(new Date(subEvent.start_date), 'dd/MM/yyyy HH:mm')}</p>
                    <p><strong>Data e Hora Final:</strong> {format(new Date(subEvent.end_date), 'dd/MM/yyyy HH:mm')}</p>
                    <p><strong>Localização:</strong> Bloco {subEvent.address.block}, Sala {subEvent.address.room}</p>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="yellow" onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubscribe} isLoading={loading} ml={3}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Se Inscrever"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalPickTicket;
