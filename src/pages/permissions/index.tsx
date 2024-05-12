import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, TitlePageId, TitleId, Main } from '../../styles/pages/events/style';
import { Button, Spinner, Table, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import styles from "@/styles/Home.module.css";
import ModalAddPersonPermission from '@/components/Modals/ModalAddPersonPermission';
import ModalNotifyPerson from '@/components/Modals/ModalNotifyPerson';


const EventoDetailsPage: React.FC = () => {
    const router = useRouter();
    const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
    const [notifyPersonModalOpen, setNotifyPersonModalOpen] = useState(false);


    return (
        <>
            <Head>
                <title>Humanitas | Permissioes</title>
                <meta name="description" content="Detalhes do Evento" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <div>

                        <TitlePageId>
                            <TitleId>
                                Permissões
                            </TitleId>

                        </TitlePageId>
                        <div className={`${styles.buttonDiv}`}>
                            <Button
                                bg="#6A0014"
                                color="white"
                                _hover={{ bg: 'red.500' }}
                                onClick={() => setAddPersonModalOpen(true)}
                            >
                                + Adicionar pessoas
                            </Button>
                            <Button
                                bg="#6A0014"
                                color="white"
                                _hover={{ bg: 'red.500' }}
                                onClick={() => setNotifyPersonModalOpen(true)}
                            >
                                Notificar pessoas
                            </Button>
                        </div>
                    </div>
                    {/* <div>
                    </div> */}
                </Container>
            </Main>

            <ModalAddPersonPermission isOpen={addPersonModalOpen} onClose={() => setAddPersonModalOpen(false)} />
            <ModalNotifyPerson isOpen={notifyPersonModalOpen} onClose={() => setNotifyPersonModalOpen(false)} />
        </>
    );
};

export default EventoDetailsPage;
