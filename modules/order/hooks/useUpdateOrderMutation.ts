import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import axiosInstance from "../../common/utils/axiosInstance";
import queryClient from "../../common/utils/queryClient";
import { ResponseError } from "../../common/validation/types";
import { OrderSchema } from "../../order/validations/orderSchema";
import { ItemProps } from "../../order/validations/types";

const useUpdateOrderMutation = () => {
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
      return await axiosInstance.put("/client/orders", values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          User_token: `${user_token}`,
        },
      });
    },
    {
      onError: (error) => {
        toast({ description: error.response?.data.Message, status: "warning" });
      },
      onSuccess: (response) => {
        toast({
          description: `Order with id: ${response.data.OrderId} was updated`,
          status: "success",
        });

        // invalidate queries
        queryClient.invalidateQueries(["orders", "list"]);
      },
    }
  );
};
export default useUpdateOrderMutation;
