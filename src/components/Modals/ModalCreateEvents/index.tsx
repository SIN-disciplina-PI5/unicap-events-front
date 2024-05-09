import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';

interface ModalCreateEventsProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCreateEvents: React.FC<ModalCreateEventsProps> = ({ isOpen, onClose }) => {
    const initialFormData = {
        usuario_id: 2,
        nome: '',
        data: '',
        local_id: 4,
        descricao: '',
        capacidade: '',
        categoria: '',
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

            const response = await axios.post('https://unicap-events-backend.vercel.app/events', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Evento criado com sucesso:', response.data);
            resetForm(); // Chama a função para redefinir os campos do formulário
            onClose(); // Fecha o modal após a criação do evento
        } catch (error) {
            console.error('Ocorreu um erro ao criar o evento:', error);
            // Lógica para lidar com o erro de criação do evento
        } finally {
            setLoading(false); // Define o estado de loading como false após o envio do evento (seja sucesso ou erro)
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input name="nome" placeholder="Nome do evento" value={formData.nome} onChange={handleInputChange} marginTop="20px" />
                    <Input name="data" type="date" placeholder="Data do evento" value={formData.data} onChange={handleInputChange} marginTop="20px" />
                    <Input name="descricao" placeholder="Descrição do evento" value={formData.descricao} onChange={handleInputChange} marginTop="20px" />
                    <Input name="capacidade" type="number" placeholder="Capacidade do evento" value={formData.capacidade} onChange={handleInputChange} marginTop="20px" />
                    <Input name="categoria" placeholder="Categoria do evento" value={formData.categoria} onChange={handleInputChange} marginTop="20px" />
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

export default ModalCreateEvents;
