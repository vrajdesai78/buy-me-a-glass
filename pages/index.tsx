import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { useRouter } from "next/router";

import {
  chakra,
  Box,
  Button,
  Stack,
  Text,
  Icon,
  Flex
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {

  const router = useRouter();

  const Feature = (props: any) => {
    return (
      <Flex bg={'#a0a0f868'} rounded='2xl' p={5} >
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            color="white"
            bg="purple.800"
          >
            <Icon
              boxSize={6}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {props.icon}
            </Icon>
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color="gray.300" >
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };

  return (
    <Box bgGradient='linear(blue.300 0%, purple.300 35%, green.100 90%)' minHeight='100vh'>
      <style jsx global>{`
            html, body {
                height: 100%;
                width: 100%;
            }
        `}</style>
      {/* Wallet icon and button */}
      <NavBar />
      <Box px={8} py={12} mx="auto">
        <Box
          w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          textAlign={{ base: "left", md: "center" }}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{ base: "normal", md: "tight" }}
            color="gray.900"
            _dark={{ color: "gray.100" }}
          >
            Create your {" "}
            <Text
              display={{ base: "block", lg: "inline" }}
              w="full"
              bgClip="text"
              bgGradient="linear(to-r, green.800,purple.800)"
              fontWeight="extrabold"
            >
              on-chain profile
            </Text>{" "}
            on Solana and receive funds in SOL.
          </chakra.h1>
          <chakra.p
            px={{ base: 0, lg: 24 }}
            mb={6}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="purple.800"
            _dark={{ color: "gray.300" }}
          >
            Buy Me A Glass is a platform where any user can create their own on-chain profile and receive donations in SOL.
          </chakra.p>
          <Stack
            direction={{ base: "column", sm: "row" }}
            mb={{ base: 4, md: 8 }}
            spacing={2}
            justifyContent={{ sm: "left", md: "center" }}
          >
            <Button
              as="a"
              colorScheme="gray"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: "full", sm: "auto" }}
              size="lg"
              cursor="pointer"
              onClick={() => router.push("/create")}
            >
              Create your profile now
              <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
          </Stack>
        </Box>
        <Box
          w={{ base: "full", md: 10 / 12 }}
          mx="auto"
          textAlign="center"
        >
        </Box>
        <Flex
        w="auto"
        bgGradient="linear(to-r, green.800,purple.800)"
        rounded="xl"
        justifyContent="center"
        alignItems="center"
      >
        <Box py={12} rounded="xl">
          <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
            <Box textAlign={{ lg: "center" }}>
              <chakra.h1
                color='white'
                fontWeight="semibold"
                fontSize={'xl'}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Buy Me A Glass
              </chakra.h1>
              <chakra.p
                mt={2}
                fontSize={{ base: "3xl", sm: "4xl" }}
                lineHeight="8"
                fontWeight="extrabold"
                letterSpacing="tight"
                color="white"
              >
                A better way to create your profile and receive donations in SOL
              </chakra.p>
              <chakra.p
                mt={4}
                maxW="2xl"
                fontSize="xl"
                mx={{ lg: "auto" }}
                color="gray.200"
              >
                Create your on-chain profile on Solana, on creating profile NFT will be minted to your wallet and you will receive SOL in your wallet.
              </chakra.p>
            </Box>

            <Box mt={10}>
              <Stack
                color={'white'}
                spacing={{ base: 10, md: 0 }}
                display={{ md: "grid" }}
                gridTemplateColumns={{ md: "repeat(2,1fr)" }}
                gridColumnGap={{ md: 8 }}
                gridRowGap={{ md: 10 }}
              >
                <Feature
                  title="Security"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  }
                >
                  All your personal data including social media links will be stored inside the NFT which will be minted to your wallet. So no one can modify your data. 
                </Feature>

                <Feature
                  title=" No hidden fees"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  }
                >
                  Create your profile for free, you don&apos;t need to pay any fees to create your profile. Even the NFT which will be minted to your address is free.
                </Feature>

                <Feature
                  title="Secure Transfers"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  }
                >
                  Receive SOL in your wallet directly, no need to worry about your funds being stolen. All the transactions are peer to peer. 
                </Feature>

                <Feature
                  title="Fully Decentralized"
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  }
                >
                  No central authority is involved in the process, all the transactions are peer to peer and all data is stored inside an NFT which is owned by you. 
                </Feature>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Flex>
      </Box>
      <Footer/>
    </Box>
  );
};

export default Home;
