import {
    chakra,
    Flex,
    HStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from 'next/image';
import React from "react";
import logo from '../assets/logo.png';

export const NavBar = () => {

    require("@solana/wallet-adapter-react-ui/styles.css");

    const WalletMultiButtonDynamic = dynamic(
        async () =>
            (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

    return (
        <React.Fragment>
            <chakra.header
                bg={'transparent'}
                w="full"
                px={{ base: 4, sm: 6 }}
                py={4}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Flex>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1} >
                        <WalletMultiButtonDynamic style={{ 'background':'#260367' }} />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}