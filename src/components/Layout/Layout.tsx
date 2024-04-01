import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SideBar } from "../SideBar/SideBar"
import { WrapperSideBar, Container } from "./styles"
import { Avatar } from '@chakra-ui/react'

interface ILayout {
    children: React.ReactNode;
    showLayout: boolean;
}

const Layout: React.FC<ILayout> = ({ children, showLayout }) => {
    const { asPath } = useRouter();
    const refContainer = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        refContainer?.current?.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [asPath]);

    const isLoginPage = asPath === '/login';

    return (
        <div>
            {!isLoginPage && showLayout && (
                <Box>
                    <Box ref={refContainer}>
                        <Box>
                            <Container>
                                <WrapperSideBar>
                                    <SideBar />
                                </WrapperSideBar>

                                <WrapperSideBar>
                                    <img src="/humanitas.jfif" alt="Descrição da imagem" />
                                </WrapperSideBar>
                            </Container>
                        </Box>
                        <Box>{children}</Box>
                    </Box>
                </Box>
            )}
            {isLoginPage && <div>{children}</div>}
        </div>
    );
};

export default Layout;
