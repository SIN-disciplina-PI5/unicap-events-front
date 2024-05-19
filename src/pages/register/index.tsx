import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { LoginContainer, ImageContainer, ButtonContainer, ContainerRegister } from '@/styles/pages/login/style';

const Register: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ra, setRA] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.'); // Define a mensagem de erro
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await axios.post('https://unicap-events-backend.vercel.app/auth/register', {
                name,
                email,
                password,
                confirm_password: confirmPassword,
                ra,
                phone,
            });
    
            // Verifica se a resposta foi bem-sucedida
            if (response.status === 200) {
                // Se o registro for bem-sucedido, você pode querer fazer algo, como redirecionar para a página de login
                router.push('/login');
            } else {
                setError('Erro ao fazer cadastro. Verifique os dados fornecidos.');
            }
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

            <ContainerRegister>
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

                            <FormLabel>RA</FormLabel>
                            <Input type="text" value={ra} onChange={(e) => setRA(e.target.value)} />

                            <FormLabel>Telefone</FormLabel>
                            <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                            {error && <p>{error}</p>} {/* Exibe a mensagem de erro se houver */}

                            <ButtonContainer>
                                <Button
                                    mt={4}
                                    bg="#6A0014"
                                    color="white"
                                    type="submit"
                                    _hover={{ bg: 'red.500' }}
                                    isLoading={loading}
                                >
                                    Cadastrar
                                </Button>
                            </ButtonContainer>
                        </FormControl>
                    </form>
                    <Link href="/login">
                        <p style={{ marginTop: '10px', display: 'block', textAlign: 'center', color: '#6A0014' }}>
                            Já possui conta? Faça Login
                        </p>
                    </Link>
                </LoginContainer>
            </ContainerRegister>
        </>
    );
};

export default Register;