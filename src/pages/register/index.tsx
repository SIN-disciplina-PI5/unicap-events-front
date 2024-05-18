import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { LoginContainer, ImageContainer, ButtonContainer } from '@/styles/pages/login/style';

const Register: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://unicap-events-backend.vercel.app/auth/register', {
                name,
                email,
                password,
            });

            // Supondo que o registro seja bem-sucedido, redirecionar para a página inicial
            router.push('/');
        } catch (error) {
            setError('Erro ao fazer cadastro. Verifique os dados fornecidos.');
            console.error('Ocorreu um erro:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Cadastro | Humanitas</title>
                <meta name="description" content="Cadastro de novos usuários" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <LoginContainer>
                    <ImageContainer>
                        <img src="/humanitas.jfif" alt="Your Image" />
                    </ImageContainer>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <FormLabel>Senha</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <FormLabel>Confirmar Senha</FormLabel>
                            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                            {error && <p>{error}</p>}

                            <ButtonContainer>
                                <Button
                                    mt={4}
                                    bg="#6A0014"
                                    color="white"
                                    type="submit"
                                    isLoading={loading}
                                >
                                    Cadastrar
                                </Button>
                            </ButtonContainer>
                        </FormControl>
                    </form>
                </LoginContainer>
            </Container>
        </>
    );
};

export default Register;
