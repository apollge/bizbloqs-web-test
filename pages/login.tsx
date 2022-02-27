import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGetAccessToken from "../modules/common/hooks/useGetAccessToken";
import { useLocalStorage } from "../modules/common/hooks/useLocalStorage";
import LoginForm from "../modules/user/components/forms/LoginForm";

const LoginPage = () => {
  const getAccessToken = useGetAccessToken();
  const [accessToken, setAccessToken] = useLocalStorage("access_token");

  const [hasTokenError, setHasTokenError] = useState(false);

  const getAccessTokenData = async () => {
    try {
      const response = await getAccessToken.mutateAsync({
        client_id: "test",
        client_secret: "test",
        grant_type: "client_credentials",
      });

      if (response.data.access_token) {
        setAccessToken(response.data.access_token);
      }

      setHasTokenError(false);
    } catch (e) {
      setHasTokenError(true);
    }
  };

  // re-render if accessToken changes
  useEffect(() => {
    if (!accessToken) {
      getAccessTokenData();
    }
  }, [accessToken]);

  return (
    <Flex
      align={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      justify={"center"}
      minH={"100vh"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {hasTokenError && !getAccessToken.isLoading ? (
          <Text>Error getting access token</Text>
        ) : (
          <>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Login</Heading>
            </Stack>
            <Box
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              boxSize="md"
              height="100%"
              p={8}
              rounded={"lg"}
            >
              <LoginForm />
            </Box>
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default LoginPage;
