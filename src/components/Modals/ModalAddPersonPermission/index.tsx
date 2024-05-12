import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';

const AddPersonModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleAddPerson = () => {
        // Lógica para adicionar pessoa com o email fornecido
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Pessoa</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} colorScheme='red' mr={3}>Cancelar</Button>
                    <Button colorScheme="green" onClick={handleAddPerson}>
                        Adicionar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddPersonModal;
