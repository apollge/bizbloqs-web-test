import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import OrderForm from "../modules/order/components/forms/OrderForm";
import ListItem from "../modules/order/components/ListItem";
import ListItemSkeleton from "../modules/order/components/ListItemSkeleton";
import useGetOrders from "../modules/order/hooks/useGetOrders";

const OrderPage: FC = () => {
  const addOrderModalDisclosure = useDisclosure();

  const {
    isLoading,
    isError,
    error,
    data: orders,
    isFetching,
    isPreviousData,
    page,
    setPage,
  } = useGetOrders();

  const orderRows = useMemo(
    () => orders?.data.Items.map((item) => item),
    [orders?.data]
  );

  return (
    <Flex
      align={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      justify={"center"}
      minH={"100vh"}
    >
      <Stack spacing={4} mx={"auto"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Orders</Heading>
        </Stack>
        <Flex justifyContent="flex-end">
          <Button onClick={() => addOrderModalDisclosure.onOpen()}>Add</Button>
        </Flex>
        <VStack
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          boxSize="3xl"
          height="100%"
          rounded={"lg"}
          spacing={4}
        >
          {isFetching ? (
            <ListItemSkeleton />
          ) : isError ? (
            <Box py="1rem">Error: {error.Message}</Box>
          ) : (
            <Box width="100%">
              {orderRows?.map((order) => (
                <Box key={order.OrderId}>
                  <ListItem item={order} />
                  <Divider />
                </Box>
              ))}
            </Box>
          )}
          <HStack justify="space-between" width="100%" padding="1rem">
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0 || isLoading || isFetching}
            >
              Previous Page
            </Button>
            <Text>Page: {page + 1}</Text>
            <Button
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={isPreviousData || isLoading || isFetching}
            >
              Next Page
            </Button>
          </HStack>
        </VStack>
      </Stack>
      <OrderForm disclosure={addOrderModalDisclosure} />
    </Flex>
  );
};

export default OrderPage;
