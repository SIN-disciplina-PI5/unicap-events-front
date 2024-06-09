import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Container, ImageContainer, LoginContainer, ButtonContainer } from '../../styles/pages/login/style';

export default function User() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const expiration = localStorage.getItem('expiration');
            if (expiration && new Date(expiration) > new Date()) {
                router.push('/');
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expiration');
                router.push('/login');
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post('https://unicap-events-backend.onrender.com/auth/login', {
                email: email,
                password: password
            });

            const token = response.data.data.token;
            const permission = response.data.data.permission;
            const expiration = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); 
            localStorage.setItem('accessToken', token);
            localStorage.setItem('permission', permission);
            localStorage.setItem('expiration', expiration.toISOString());

            router.push('/');
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.');

        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <Head>
                <title>Unicap Events</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <LoginContainer>
                    <ImageContainer>
                        <img src="/unicap-events.jpg" alt="Your Image" />
                    </ImageContainer>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                            <FormLabel>Senha</FormLabel>
                            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                            {error && <p>{error}</p>}

                            <ButtonContainer>
                                <Button
                                    mt={4}
                                    bg="#6A0014"
                                    color="white"
                                    type='submit'
                                    _hover={{ bg: 'red.500' }}
                                    isLoading={loading}
                                >
                                    Entrar
                                </Button>
                            </ButtonContainer>
                        </FormControl>
                    </form>
                    <Link href="/register">
                        <p style={{ marginTop: '10px', display: 'block', textAlign: 'center', color: '#6A0014' }}>
                            Não tem uma conta? <u>Cadastre-se</u>
                        </p>
                    </Link>
                    <Link href="/easter-egg">
                        <p style={{ display: 'block', textAlign: 'center', color: '#6A0014' }}>
                            Veja mais sobre os criadores
                        </p>
                    </Link>
                </LoginContainer>
            </Container>
        </>
    );
}
