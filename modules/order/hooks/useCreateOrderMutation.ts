import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import axiosInstance from "../../common/utils/axiosInstance";
import queryClient from "../../common/utils/queryClient";
import { ResponseError } from "../../common/validation/types";
import { OrderSchema } from "../validations/orderSchema";
import { ItemProps } from "../validations/types";

const useCreateOrderMutation = () => {
  const toast = useToast();

  const [access_token] = useLocalStorage("access_token");
  const [user_token] = useLocalStorage("user_token");

  return useMutation<
    AxiosResponse<ItemProps>,
    AxiosError<ResponseError>,
    OrderSchema
  >(
    "createOrder",
    async (values) => {
      return await axiosInstance.post("/client/orders", values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          User_token: `${user_token}`,
        },
      });
    },
    {
      onError: (error) => {
        toast({ description: error.response?.data.Message, status: "error" });
      },
      onSuccess: () => {
        toast({ description: "Order Created", status: "success" });

        // invalidate queries
        queryClient.invalidateQueries(["orders", "list"]);
      },
    }
  );
};
export default useCreateOrderMutation;
