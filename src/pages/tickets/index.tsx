import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Flex, TableContainer, TableCaption } from '@chakra-ui/react';
import { Title, TitlePage } from '@/styles/pages/events/style';

const TicketsPage: React.FC = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://unicap-events-back-end.vercel.app/accreditation/daf9ef59-23f1-47f1-a7f3-3924ada70e36');
                setTickets(response.data.data);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os tickets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div>
             <TitlePage>
                        <Title>
                            Credenciamento
                        </Title>
                    </TitlePage>

            {loading ? (
                <Flex justify="center" align="center" height="60px">
                    <Spinner size="xl" color="red.500" />
                </Flex>
            ) : (
                <TableContainer>
                    <Table variant='simple' colorScheme='red'>
                        <TableCaption>Tabela de Tickets</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Nome do Usuário</Th>
                                <Th>Email</Th>
                                <Th>Código do Ticket</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tickets.map(ticket => (
                                <Tr key={ticket.id}>
                                    <Td>{ticket.user ? ticket.user.name : 'N/A'}</Td>
                                    <Td>{ticket.user ? ticket.user.email : 'N/A'}</Td>
                                    <Td>{ticket.codigo_ingresso}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default TicketsPage;
