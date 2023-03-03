import { useRouter } from "next/router";
import React, { useState, useEffect, FormEventHandler } from "react";
import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Link,
  Flex,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";
import * as Web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NavBar } from "../components/NavBar";
import { programId } from "../utils/constants";
import { Program, Idl } from "@project-serum/anchor";
import idl from "../utils/idl.json";

interface UserAccount {
  profileImage: string;
  userName: string;
  name: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
  address: Web3.PublicKey;
}

export const getServerSideProps = async (context: any) => {
  const username = context.query.username;

  const [addr] = Web3.PublicKey.findProgramAddressSync(
    [Buffer.from("user"), Buffer.from(username)],
    programId
  );

  const program = new Program(idl as Idl, programId);
  const userData = await program.account.userAccount.fetch(addr);

  const link = `https://${userData.cid}.ipfs.w3s.link/${username}.json`;
  const response = await fetch(link);
  const parsedData: UserAccount = await response.json();

  return {
    // Return two props to the page component
    props: {
      parsedData,
    },
  };
};

export const socialLinkComponent = (
  url: string,
  text: string,
  icon: IconType
) => {
  return (
    <HStack spacing={2}>
      <Box minW="xl">
        <Link
          href={url}
          isExternal
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button
            minW={"50%"}
            flex={1}
            fontSize={"md"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            <Icon as={icon} size={"md"} />
            <Text
              fontSize={"md"}
              textAlign={"center"}
              color={"gray.700"}
              px={3}
            >
              {text}
            </Text>
          </Button>
        </Link>
      </Box>
    </HStack>
  );
};

const User = ({ parsedData }: { parsedData: UserAccount }) => {
  const router = useRouter();
  const { username } = router.query;
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [creatorsAddress, setCreatorsAddress] = useState<
    Web3.PublicKey | undefined
  >(undefined);

  const toast = useToast();

  useEffect(() => {
    console.log(parsedData);
    try {
      setIcon(parsedData.profileImage);
      setName(parsedData.name);
      setBio(parsedData.bio);
      setEmail(parsedData.email);
      setLinkedinUrl(`https://${parsedData.linkedinUrl}`);
      setTwitterUrl(`https://${parsedData.twitterUrl}`);
      setGithubUrl(`https://${parsedData.githubUrl}`);
      setCreatorsAddress(parsedData.address);
    } catch (error) {
      console.error(error);
    }
  }, [parsedData]);

  const [txSig, setTxSig] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const sendSol = async (event: React.ChangeEvent<HTMLFormElement>) => {
    console.log(creatorsAddress);
    event.preventDefault();
    if (!connection || !publicKey || !creatorsAddress) {
      return;
    }
    const transaction = new Web3.Transaction();
    transaction.add(
      Web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new Web3.PublicKey(creatorsAddress),
        lamports: event.target.amount.value * Web3.LAMPORTS_PER_SOL,
      })
    );
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    transaction.recentBlockhash = latestBlockhash.blockhash;

    sendTransaction(transaction, connection).then((sig) => {
      toast({
        title: "Transaction sent.",
        description: "Check the transaction on Solana Explorer.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Box
      bgGradient={"linear(blue.300 0%, purple.300 35%, green.100 100%)"}
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <style jsx global>{`
        html,
        body {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <NavBar />
      <Flex
        py={6}
        minW={"100vw"}
        maxH={"100vh"}
        p={30}
        w="full"
        alignItems="center"
        justifyContent="center"
        zIndex={1}
        position="absolute"
      >
        <Box
          maxW={"sm"}
          w={"full"}
          border="1px"
          bgGradient={"linear(blue.200 0%, purple.200 35%, green.100 100%)"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Avatar
            border={"2px"}
            size={"2xl"}
            src={icon}
            mb={4}
            pos={"relative"}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {name}
          </Heading>
          <Text fontWeight={600} color={"blue.800"} mb={4}>
            @{username}
          </Text>
          <Text
            textAlign={"center"}
            color={"black.900"}
            fontWeight="bold"
            px={3}
          >
            {bio}
          </Text>

          {/* {Show social media links of user} */}

          <VStack mt={8} direction={"row"} spacing={4}>
            {socialLinkComponent(`mailto:${email}`, "Email", MdEmail)}
            {socialLinkComponent(linkedinUrl, "LinkedIn", FaLinkedin)}
            {socialLinkComponent(twitterUrl, "Twitter", FaTwitter)}
            {socialLinkComponent(githubUrl, "Github", FaGithub)}
          </VStack>
          <form onSubmit={sendSol}>
            <Stack mt={8} direction={"row"} spacing={2}>
              <NumberInput width={"100%"}>
                <NumberInputField
                  placeholder="Enter Sol"
                  flex={2}
                  bg={"gray.100"}
                  fontSize={"sm"}
                  rounded={"md"}
                  width={"full"}
                  id="amount"
                  _focus={{
                    bg: "gray.100",
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"md"}
                bg={"blue.700"}
                size={"2xl"}
                p={2}
                color={"white"}
                type="submit"
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.900",
                }}
                _focus={{
                  bg: "blue.900",
                }}
              >
                Send Sol
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
      <Text
        fontSize="xl"
        color="black"
        textAlign="center"
        fontWeight={"bold"}
        width={"100%"}
        position="absolute"
        bottom={"0"}
      >
        Made with ❤️ by Vraj Desai
      </Text>{" "}
    </Box>
  );
};

export default User;
