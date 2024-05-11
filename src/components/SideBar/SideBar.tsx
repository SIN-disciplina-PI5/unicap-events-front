import React from 'react'
import { useRouter } from 'next/router';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Icon
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import { Header, IconExit, Text } from "../SideBar/styles"

export function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any = React.useRef()
    const navigation = useRouter();

    const iconsNav = [
        { label: "Início", path: "/" },
        { label: "Usuários", path: "/user" },
        { label: "Eventos", path: "/events" },
    ];

    const handleLogout = () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expiration');
            // Redirecionar para a tela de login
            navigation.push('/login');
        } catch (error) {
            console.error("logout error", error);
        }
    };

    return (
        <>
            <Button ref={btnRef} colorScheme='white' bg='white' onClick={onOpen}>
                <Icon as={HamburgerIcon} color='#6A0014' />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent
                    style={{
                        borderRadius: '10px',
                        margin: '10px'
                    }}>
                    <IconExit>
                        <DrawerCloseButton />
                    </IconExit>
                    <DrawerHeader>
                        <Header>
                            <p>Instituto Humanitas</p>
                        </Header>
                    </DrawerHeader>

                    <DrawerBody>
                        {iconsNav.map((item, index) => (
                            <Text
                                key={index}
                                color="#404040"
                                className="text"
                                onClick={() => {
                                    navigation.push(item.path), onClose();
                                }}
                            >
                                {item.label}
                            </Text>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="solid"
                            bg="#6A0014"
                            color="white"
                            mt={16}
                            onClick={handleLogout}
                        >
                            Sair
                        </Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    )
}
