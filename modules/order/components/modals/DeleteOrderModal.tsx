import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import React, { FC } from "react";
import useDeleteOrderMutation from "../../hooks/useDeleteOrderMutation";
import { OrderProps } from "../../validations/types";

interface DeleteOrderModalProps {
  disclosure: UseDisclosureReturn;
  orderId: NonNullable<OrderProps["Items"][number]["OrderId"]>;
}

const DeleteOrderModal: FC<DeleteOrderModalProps> = ({
  disclosure,
  orderId,
}) => {
  const localDisclosure = useDisclosure();
  const { isOpen, onClose } = disclosure ?? localDisclosure;

  const deleteOrderMutation = useDeleteOrderMutation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this order?</ModalBody>
        <Divider />
        <ModalFooter>
          <HStack>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              disabled={deleteOrderMutation.isLoading}
              isLoading={deleteOrderMutation.isLoading}
              mr={3}
              onClick={async () => {
                try {
                  await deleteOrderMutation.mutateAsync(orderId);
                } catch (e) {}
              }}
            >
              Delete
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteOrderModal;
