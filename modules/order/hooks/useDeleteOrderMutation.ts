import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axiosInstance from "../../common/utils/axiosInstance";
import queryClient from "../../common/utils/queryClient";
import { ResponseError } from "../../common/validation/types";
import { OrderProps } from "../../order/validations/types";

const useDeleteOrderMutation = () => {
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : "";

  const user_token =
    typeof window !== "undefined" ? localStorage.getItem("user_token") : "";

  const toast = useToast();

  return useMutation<
    AxiosResponse<OrderProps>,
    AxiosError<ResponseError>,
    NonNullable<OrderProps["Items"][number]["OrderId"]>
  >(
    async (orderId) => {
      return await axiosInstance.delete(`/client/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          User_token: `${user_token}`,
        },
      });
    },
    {
      onError: (error) => {
        toast({ description: error.response?.data.Message });
      },
      onSuccess: (response) => {
        toast({ description: "Deleted", status: "info" });

        // invalidate queries
        queryClient.invalidateQueries(["orders", "list"]);
      },
    }
  );
};
export default useDeleteOrderMutation;
