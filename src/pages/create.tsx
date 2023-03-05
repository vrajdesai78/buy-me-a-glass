import {
    Flex,
    Stack,
    Box
  } from "@chakra-ui/react";
  import { NavBar } from "../components/NavBar";
  import { MultiStepForm } from "../components/MultiStepForm";
  
  export default function SplitScreen() {  
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
        <Box minHeight="calc(100vh-72px)">

          <Stack
            h={"calc(100vh - 72px)"}
            direction={{ base: "column", md: "row" }}
            w="100vw"
          >
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <MultiStepForm />
            </Flex> 
          </Stack>
        </Box>
      </Box>
    );
  }
  