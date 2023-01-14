import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Avatar,
    Center,
    SimpleGrid,
    GridItem,
    InputGroup,
    InputLeftAddon,
    Textarea,
    Box, 
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { useWallet } from '@solana/wallet-adapter-react';
import { Web3Storage } from 'web3.storage';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';

export default function UserProfileEdit(): JSX.Element {

    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')

    const router = useRouter()

    const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        switch (name) {
            case 'icon':
                e.preventDefault()
                const files = (e.target as HTMLInputElement).files!;
                if (process.env.ACCESS_TOKEN != null) {
                    const client = new Web3Storage({ token: process.env.ACCESS_TOKEN })
                    client.put(files).then((cid) => {
                        setIcon(`https://${cid}.ipfs.w3s.link/${files[0].name}`)
                    })
                } else {
                    console.log("No access token")
                }
                break
            case 'name':
                setName(value)
                break
            case 'userName':
                setUserName(value)
                break
            case 'bio':
                setBio(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'linkedinUrl':
                setLinkedinUrl(value)
                break
            case 'twitterUrl':
                setTwitterUrl(value)
                break
            case 'githubUrl':
                setGithubUrl(value)
                break
            default:
                break
        }
    }

    const { publicKey } = useWallet();


    async function mintNFT(): Promise<any> {

        if (userName == '' || name == '' || email == '') {            
            alert("Please fill in all required fields")
            return
        }

        if (process.env.PRIVATE_KEY != null) {
            const sdk = ThirdwebSDK.fromPrivateKey("devnet", process.env.PRIVATE_KEY);
            const program = await sdk.getProgram("4mWbQ2wte2FbauiTQ3sNY681rxfNu8DZKWscrF7RJPEJ", "nft-collection");
            
            const metadata = {
                name: userName,
                symbol: "CANDY",
                Image: 'https://bafybeiavgggc64ebnpayng3jmkhdwpgvuka2xus3dh5hnjmmls2ncblg3e.ipfs.w3s.link/Buy%20Me.png',
                description: "NFT used to create profile in buy me a candy",
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
                const mintAddress = await program.mintTo(publicKey.toBase58(), metadata);
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
        <Box bgGradient='linear(blue.300 0%, purple.300 35%, green.100 90%)'>
            <style jsx global>{`
            html, body {
                height: 100%;
                max-width: 100%;
                overflow-x: hidden;
            }
        `}</style>
            <NavBar />
            <Flex
                minH={'100vh'}
                minW={'100vw'}
                align={'center'}
                justify={'center'}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    border={'1px'}
                    p={6}
                    my={12}
                    m={4}
                    bg='#dae3fb91'>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        Create your page
                    </Heading>
                    <form>
                        <FormControl id="userProfile">
                            <FormLabel>User Icon</FormLabel>
                            <Stack direction={['column', 'row']} spacing={6}>
                                <Center>
                                    <Avatar size="xl" src={icon} border={'1px'} color={'gray.800'} >
                                    </Avatar>
                                </Center>
                                <Center w="full">
                                    <Input
                                        borderColor={'gray.800'}
                                        _hover={{ borderColor: 'blue.800', border: '2px' }}
                                        p={1}
                                        colorScheme="blue"
                                        variant="outline"
                                        w="full"
                                        type="file"
                                        accept="image/*"
                                        name='file'
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('icon', e)}
                                    />
                                </Center>
                            </Stack>
                        </FormControl>
                    </form>

                    <FormControl id="userName" isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('userName', e)}>
                        <FormLabel>User Name</FormLabel>
                        <Input
                            _hover={{ borderColor: 'blue.800', border: '2px' }}
                            placeholder="User Name"
                            borderColor={'gray.800'}
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>

                    <FormControl id="name" isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e)}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            _hover={{ borderColor: 'blue.800', border: '2px' }}
                            placeholder="Name"
                            borderColor={'gray.800'}
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>

                    <FormControl id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bio', e)}>
                        <FormLabel
                            color="gray.700"
                            _dark={{
                                color: "gray.50",
                            }}
                        >
                            Bio
                        </FormLabel>
                        <Textarea
                            placeholder="Write your bio"
                            borderColor={'gray.800'}
                            mt={1}
                            rows={3}
                            shadow="sm"
                        />
                    </FormControl>
                    <FormControl id="userEmail" isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e)}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            _hover={{ borderColor: 'blue.800', border: '2px' }}
                            placeholder="your-email@example.com"
                            borderColor={'gray.800'}
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>

                    <SimpleGrid>
                        <FormControl id="linkedinUrl" as={GridItem} colSpan={[3, 2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('linkedinUrl', e)}>
                            <FormLabel
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                Linkedin URL
                            </FormLabel>
                            <InputGroup borderColor={'gray.800'} >
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
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>

                    <SimpleGrid>
                        <FormControl id='twitterUrl' as={GridItem} colSpan={[3, 2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('twitterUrl', e)}>
                            <FormLabel
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                Twitter URL
                            </FormLabel>
                            <InputGroup borderColor={'gray.800'} >
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
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>

                    <SimpleGrid>
                        <FormControl id='githubUrl' as={GridItem} colSpan={[3, 2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('githubUrl', e)}>
                            <FormLabel color="gray.700">
                                GitHub URL
                            </FormLabel>
                            <InputGroup borderColor={'gray.800'} >
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
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>

                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'blue.800'}
                            color={'white'}
                            w="full"
                            type='submit'
                            onClick={mintNFT}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Create Profile
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Footer />
        </Box>
    );
}