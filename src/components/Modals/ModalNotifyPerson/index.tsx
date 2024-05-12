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
    Textarea,
} from '@chakra-ui/react';

const NotifyPersonModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleNotify = () => {
        // Lógica para notificar pessoas com o assunto e mensagem fornecidos
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Notificar Pessoas</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Assunto</FormLabel>
                        <Input value={assunto} onChange={(e) => setAssunto(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Mensagem</FormLabel>
                        <Textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3} colorScheme='red'>Cancelar</Button>
                    <Button colorScheme="green" onClick={handleNotify}>
                        Notificar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NotifyPersonModal;
