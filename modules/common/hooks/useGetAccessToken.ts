import { useMutation } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import qs from "querystring";
import { AccessTokenSchema } from "../validation/accessTokenSchema";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseError } from "../validation/types";
import { useToast } from "@chakra-ui/react";

interface AccessTokenProps {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export type UseGetAccessToken = AccessTokenProps | undefined;

const useGetAccessToken = () => {
  const toast = useToast();

  return useMutation<
    AxiosResponse<AccessTokenProps>,
    AxiosError<ResponseError>,
    AccessTokenSchema
  >(
    "getAccessToken",
    async (values) => {
      let params = new URLSearchParams();
      params.append("client_id", values.client_id);
      params.append("client_secret", values.client_secret);
      params.append("grant_type", values.grant_type);

      return await axiosInstance.post("/authorization/token", params);
    },
    {
      onError: (error) => {
        toast({ description: error.response?.data.Message });
      },
    }
  );
};
export default useGetAccessToken;
