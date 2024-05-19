import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';

interface ModalCreateSubEventsProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: number; // ID do evento principal
    onUpdateSubEvents: () => void; // Função para atualizar a lista de subeventos após a criação
}

const ModalCreateSubEvents: React.FC<ModalCreateSubEventsProps> = ({ isOpen, onClose, eventId, onUpdateSubEvents }) => {
    const initialFormData = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        block: '',
        room: '',
        quantity: 0,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento do botão

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true); // Define o estado de loading como true
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Lógica para lidar com a falta de token
                return;
            }

            // Formatar as datas para o formato esperado pela API (YYYY-MM-DD HH:MM:SS)
            const formattedFormData = {
                ...formData,
                start_date: formData.start_date.replace('T', ' '), // Remove 'T' e mantém o tempo no formato 'HH:MM:SS'
                end_date: formData.end_date.replace('T', ' '), // Remove 'T' e mantém o tempo no formato 'HH:MM:SS'
                event: eventId, // Associa o sub-evento ao evento principal
                address: {
                    block: formData.block,
                    room: formData.room,
                },
                tickets: Array.from({ length: formData.quantity }, () => ({ status: 'available' })),
            };

            const response = await axios.post(`https://unicap-events-back-end.vercel.app/sub-event/`, formattedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Subevento criado com sucesso:', response.data);
            resetForm(); // Chama a função para redefinir os campos do formulário
            onUpdateSubEvents(); // Atualiza a lista de subeventos após a criação do subevento
            onClose(); // Fecha o modal após a criação do subevento
        } catch (error) {
            console.error('Ocorreu um erro ao criar o subevento:', error);
            // Lógica para lidar com o erro de criação do subevento
        } finally {
            setLoading(false); // Define o estado de loading como false após o envio do subevento (seja sucesso ou erro)
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Sub-Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input name="name" placeholder="Nome do sub-evento" value={formData.name} onChange={handleInputChange} marginTop="20px" />
                    <Input name="description" placeholder="Descrição do sub-evento" value={formData.description} onChange={handleInputChange} marginTop="20px" />
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Inicial</FormLabel>
                        <Input name="start_date" type="datetime-local" value={formData.start_date} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Final</FormLabel>
                        <Input name="end_date" type="datetime-local" value={formData.end_date} onChange={handleInputChange} />
                    </FormControl>
                    <Input name="block" placeholder="Bloco" value={formData.block} onChange={handleInputChange} marginTop="20px" />
                    <Input name="room" placeholder="Sala" value={formData.room} onChange={handleInputChange} marginTop="20px" />
                    <FormControl marginTop="20px">
                        <FormLabel>Quantidade de Ingressos</FormLabel>
                    <Input name="quantity" type="number" placeholder="Quantidade de Ingressos" value={formData.quantity} onChange={handleInputChange}  />
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Adicionar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalCreateSubEvents