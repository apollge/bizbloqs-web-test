import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axiosInstance from "../../common/utils/axiosInstance";
import { ResponseError } from "../../common/validation/types";
import { UserProps } from "../validations/types";
import { UserSchema } from "../validations/userSchema";

const useLogin = () => {
  const toast = useToast();
  return useMutation<
    AxiosResponse<UserProps>,
    AxiosError<ResponseError>,
    UserSchema
  >(
    "login",
    async (values) => {
      const access_token = localStorage.getItem("access_token");

      return await axiosInstance.post("application/account/login", values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    },
    {
      onError: (error) => {
        toast({ description: error.response?.data.Message, status: "error" });
      },
    }
  );
};
export default useLogin;
