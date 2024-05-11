import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, Select } from '@chakra-ui/react';
import axios from 'axios';

interface ModalCreateUserProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ isOpen, onClose }) => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        ra: '',
        phone: '',
        type: '',
        permission: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento do botão

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

            const response = await axios.post(`${process.env.BACKEND_URL}/user/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Usuário criado com sucesso:', response.data);
            resetForm(); // Chama a função para redefinir os campos do formulário
            onClose(); // Fecha o modal após a criação do usuário
        } catch (error) {
            console.error('Ocorreu um erro ao criar o usuário:', error);
            // Lógica para lidar com o erro de criação do usuário
        } finally {
            setLoading(false); // Define o estado de loading como false após o envio do usuário (seja sucesso ou erro)
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input name="name" placeholder="Nome" value={formData.name} onChange={handleInputChange} marginTop="20px" />
                    <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} marginTop="20px" />
                    <Input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleInputChange} marginTop="20px" />
                    <Input name="ra" placeholder="RA" value={formData.ra} onChange={handleInputChange} marginTop="20px" />
                    <Input name="phone" placeholder="Telefone" value={formData.phone} onChange={handleInputChange} marginTop="20px" />
                    <Select name="type" placeholder="Selecione o tipo" value={formData.type} onChange={handleInputChange} marginTop="20px">
                        <option value="Estudante">Estudante</option>
                        <option value="Professor">Professor</option>
                    </Select>
                    <Select name="permission" placeholder="Permissão" value={formData.permission} onChange={handleInputChange} marginTop="20px">
                        <option value="Administrador">Administrador</option>
                        <option value="Organizador">Organizador</option>
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="red" /> : "Adicionar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalCreateUser;
