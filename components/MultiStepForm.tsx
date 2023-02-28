import React, { useEffect, useState, useRef } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  Stack,
  Center,
  Avatar,
} from "@chakra-ui/react";
import { Web3Storage } from "web3.storage";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);

  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router.isReady]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files!;
    if (process.env.ACCESS_TOKEN != null) {
      const client = new Web3Storage({ token: process.env.ACCESS_TOKEN });
      client.put(files).then((cid) => {
        setIcon(`https://${cid}.ipfs.w3s.link/${files[0].name}`);
      });
    } else {
      console.log("No access token");
    }
  };

  const { publicKey } = useWallet();

  const toast = useToast()

  async function mintNFT(): Promise<any> {
      if (userName == '' || name == '' || email == '') {            
          alert("Please fill in all required fields")
          return
      }

      if (process.env.PRIVATE_KEY != null) {
          const sdk = ThirdwebSDK.fromPrivateKey("devnet", process.env.PRIVATE_KEY);
          const program = await sdk.getProgram("HjyuCUSUZ2VGkDJNw9QpJMXgNVfRJeaU5QFwyiLGZdpB", "nft-collection");
          
          const metadata = {
              name: userName,
              symbol: "GLASS",
              image: "https://bafybeiee7qg2rte7wlch47akx3zj2toj5wvbetiska3bqb2r2yjgjc3yky.ipfs.w3s.link/Buy%20Me.gif",
              description: "NFT used to create profile in buy me a glass",
              properties: [
                  {
                      name: "Profile",
                      value: icon
                  },
                  {
                      name: "Name",
                      value: name
                  },
                  {
                      name: "Bio",
                      value: bio
                  },
                  {
                      name: "Email",
                      value: email
                  },
                  {
                      name: "Linkedin",
                      value: "https://" + linkedinUrl
                  },
                  {
                      name: "Twitter",
                      value: "https://" + twitterUrl
                  },
                  {
                      name: "Github",
                      value: "https://" + githubUrl
                  }
              ]
          }
          if (publicKey != null) {
              await program.mintTo(publicKey.toBase58(), metadata);
              toast({
                  title: "Profile Created",
                  description: "Your Profile has been created successfully",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
              })
              router.push('/'+userName)
          } else {
              alert("Please connect your wallet")
              console.error("No public key found")
          }
      } else {
          console.error("No private key found")
      }
  }

  return (
    <>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={"100v"}
          p={6}
          m="5px auto"
          bg="#fefefe60"
        >
          <Progress
            hasStripe
            value={progress}
            mb="5%"
            mx="5%"
            isAnimated
          ></Progress>
          {step === 1 ? (
            <Box>
              <Flex align={"center"} justify={"center"}>
                <Stack
                  spacing={4}
                  w={"md"}
                  maxW={"100%"}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  border={"1px"}
                  p={6}
                  my={12}
                  m={4}
                  bg="#fefefe60"
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                    Create your page
                  </Heading>
                  <form>
                    <FormControl id="userProfile">
                      <FormLabel>User Icon</FormLabel>
                      <Stack direction={["column", "row"]} spacing={6}>
                        <Center>
                          <Avatar
                            size="xl"
                            src={icon}
                            border={"1px"}
                            color={"gray.800"}
                          ></Avatar>
                        </Center>
                        <Center w="full">
                          <Input
                            borderColor={"gray.800"}
                            _hover={{ borderColor: "blue.800", border: "2px" }}
                            p={1}
                            colorScheme="blue"
                            variant="outline"
                            w="full"
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleInputChange(e)}
                          />
                        </Center>
                      </Stack>
                    </FormControl>
                  </form>

                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      _hover={{ borderColor: "blue.800", border: "2px" }}
                      placeholder="Username"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserName(e.target.value)
                      }
                      value={userName}
                    />
                  </FormControl>

                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      _hover={{ borderColor: "blue.800", border: "2px" }}
                      placeholder="Name"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      value={name}
                    />
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      Bio
                    </FormLabel>
                    <Textarea
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setBio(e.target.value)
                      }
                      placeholder="Write your bio"
                      borderColor={"gray.800"}
                      mt={1}
                      rows={3}
                      shadow="sm"
                      value={bio}
                    />
                  </FormControl>
                </Stack>
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex align={"center"} justify={"center"}>
                <Stack
                  spacing={4}
                  w={"md"}
                  maxW={"100%"}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  border={"1px"}
                  p={6}
                  my={12}
                  m={4}
                  bg="#ffffff91"
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                    Create your page
                  </Heading>
                  <FormControl id="userEmail" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      _hover={{ borderColor: "blue.800", border: "2px" }}
                      placeholder="your-email@example.com"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "gray.500" }}
                      type="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      value={email}
                    />
                  </FormControl>

                  <SimpleGrid>
                    <FormControl
                      id="linkedinUrl"
                      as={GridItem}
                      colSpan={[3, 2]}
                    >
                      <FormLabel
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Linkedin URL
                      </FormLabel>
                      <InputGroup borderColor={"gray.800"}>
                        <InputLeftAddon
                          bg="gray.100"
                          color="gray.500"
                          rounded="md"
                        >
                          https://
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="linkedin.com/in/username"
                          focusBorderColor="brand.400"
                          rounded="md"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setLinkedinUrl(e.target.value)
                          }
                          value={linkedinUrl}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid>
                    <FormControl id="twitterUrl" as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Twitter URL
                      </FormLabel>
                      <InputGroup borderColor={"gray.800"}>
                        <InputLeftAddon
                          bg="gray.100"
                          color="gray.500"
                          rounded="md"
                        >
                          https://
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="twitter.com/username"
                          focusBorderColor="brand.400"
                          rounded="md"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTwitterUrl(e.target.value)
                          }
                          value={twitterUrl}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid>
                    <FormControl id="githubUrl" as={GridItem} colSpan={[3, 2]}>
                      <FormLabel color="gray.700">GitHub URL</FormLabel>
                      <InputGroup borderColor={"gray.800"}>
                        <InputLeftAddon
                          bg="gray.100"
                          color="gray.500"
                          rounded="md"
                        >
                          https://
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="github.com/username"
                          focusBorderColor="brand.400"
                          rounded="md"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setGithubUrl(e.target.value)
                          }
                          value={githubUrl}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <Stack spacing={6} direction={["column", "row"]}></Stack>
                </Stack>
              </Flex>
            </Box>
          )}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 50);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 2}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 2) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 50);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              {step === 2 ? (
                <Button
                  bg={"blue.800"}
                  color={"white"}
                  w="9rem"
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={mintNFT}
                >
                  Create Profile
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      )}
    </>
  );
};
