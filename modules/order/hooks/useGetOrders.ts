import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import axiosInstance from "../../common/utils/axiosInstance";
import { ResponseError } from "../../common/validation/types";
import { LIMIT } from "../constants/limit";
import { OrderProps } from "../validations/types";

const useGetOrders = () => {
  const [page, setPage] = useState(0);

  const [access_token] = useLocalStorage("access_token");
  const [user_token] = useLocalStorage("user_token");

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
