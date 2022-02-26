import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../common/utils/axiosInstance";
import { ResponseError } from "../../common/validation/types";
import { LIMIT } from "../constants/limit";
import { OrderSchema } from "../validations/orderSchema";
import { OrderProps } from "../validations/types";

const useGetOrders = () => {
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : "";

  const user_token =
    typeof window !== "undefined" ? localStorage.getItem("user_token") : "";

  const [page, setPage] = useState(0);

  const result = useQuery<AxiosResponse<OrderProps>, ResponseError>(
    ["orders", "list"],
    async () => {
      const params = {
        limit: LIMIT,
        offSet: page,
      };

      const response = await axiosInstance.get<OrderProps>(`/client/orders`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          User_token: `${user_token}`,
        },
        params,
      });

      return response;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { refetch } = result;

  useEffect(() => {
    void refetch();
  }, [page, refetch]);

  return {
    ...result,
    page,
    setPage,
  };
};
export default useGetOrders;
