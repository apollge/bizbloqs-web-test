import {
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { formatDate } from "../../common/utils/formatDate";
import DeleteOrderModal from "./modals/DeleteOrderModal";
import { OrderProps } from "../validations/types";
import OrderForm from "./forms/OrderForm";

interface ListItemProps {
  item: OrderProps["Items"][number];
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  const editOrderModalDisclosure = useDisclosure();
  const deleteOrderModalDisclosure = useDisclosure();

  return (
    <>
      <VStack alignItems="center" padding="1rem" width="100%">
        <HStack alignItems="center" justifyContent="space-between" width="100%">
          <Heading fontSize="lg">{item.Label}</Heading>
          <Text>Order ID: {item.OrderId}</Text>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between" width="100%">
          <Text isTruncated>{item.Description}</Text>
          <Text>Delivery Date: {formatDate(item.DeliveryDate)}</Text>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" width="100%">
          <Text>Reference: {item.Reference}</Text>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" width="100%">
          <Text>Remarks: {item.Remarks}</Text>
        </HStack>

        <Flex justifyContent="flex-end" width="100%">
          <HStack>
            <Button
              variant="link"
              onClick={() => editOrderModalDisclosure.onOpen()}
            >
              Edit
            </Button>
            <Button
              variant="link"
              onClick={() => deleteOrderModalDisclosure.onOpen()}
            >
              Delete
            </Button>
          </HStack>
        </Flex>
      </VStack>
      <OrderForm order={item} disclosure={editOrderModalDisclosure} />
      {item.OrderId && (
        <DeleteOrderModal
          disclosure={deleteOrderModalDisclosure}
          orderId={item.OrderId}
        />
      )}
    </>
  );
};

export default ListItem;
