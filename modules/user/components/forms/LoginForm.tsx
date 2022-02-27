import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import useLogin from "../../hooks/useLogin";
import { userSchema, UserSchema } from "../../validations/userSchema";

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const router = useRouter();

  const [userToken, setUserToken] = useLocalStorage("user_token");

  useEffect(() => {
    if (!userToken) {
      setUserToken("");
    }
  }, [userToken]);

  const form = useForm<UserSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(userSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await loginMutation.mutateAsync(values);

      setUserToken(user.data.UserToken.user_token ?? "");

      void router.push("/orders");
    } catch (e) {}
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input {...register("username")} />
            <Box color="red.300">
              <ErrorMessage errors={errors} name="username" />
            </Box>
          </FormControl>
          <FormControl id="password">
            <FormLabel id="password">Password</FormLabel>
            <Input type="password" {...register("password")} />
            <Box color="red.300">
              <ErrorMessage errors={errors} name="password" />
            </Box>
          </FormControl>
          <Button
            colorScheme="blue"
            disabled={loginMutation.isLoading}
            isLoading={loginMutation.isLoading}
            type="submit"
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
