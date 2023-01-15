import {
    chakra,
    Flex,
    HStack,
    Text
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image"
import React from "react";
import logo from '../assets/logo.png';

export const NavBar = () => {

    require("@solana/wallet-adapter-react-ui/styles.css");

    const WalletMultiButtonDynamic = dynamic(
        async () =>
            (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

    const router = useRouter();

    return (
        <React.Fragment>
            <chakra.header  
                bg={'transparent'}
                w="full"
                px={{ base: 4, sm: 6 }}
                py={4}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Flex padding="1" border={'1px'} borderRadius="1em" onClick={() => {router.push('/')}} cursor={'pointer'} background="#dae3fb91">
                        <Image src={logo} alt={'logo'} width={'50'}/>
                        <Text alignSelf={'center'} fontSize="md" fontWeight={'bold'} textColor="#260367" paddingEnd={'0.5em'}>Buy Me A Glass</Text>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1} >
                        <WalletMultiButtonDynamic style={{ 'background':'#260367' }} />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}