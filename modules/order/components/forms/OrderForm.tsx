import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormProvider, useForm } from "react-hook-form";
import useCreateOrderMutation from "../../hooks/useCreateOrderMutation";
import useUpdateOrderMutation from "../../hooks/useUpdateOrderMutation";
import { orderSchema, OrderSchema } from "../../validations/orderSchema";
import { OrderProps } from "../../validations/types";

interface OrderFormProps {
  disclosure: UseDisclosureReturn;
  order?: OrderProps["Items"][number];
}

const OrderForm: FC<OrderFormProps> = ({ disclosure, order }) => {
  const localDisclosure = useDisclosure();
  const { isOpen, onClose } = disclosure ?? localDisclosure;

  const defaultValues = {
    OrderId: order?.OrderId,
    CreateDate: new Date(),
    DeliveryDate: order?.DeliveryDate ? order.DeliveryDate : undefined,
    Description: order?.Description,
    Label: order?.Label,
    LastChangedDateTime: order?.LastChangedDateTime
      ? order.LastChangedDateTime
      : undefined,
    OrderType: {
      OrderTypeId: 1,
    },
    Reference: order?.Reference,
    Remarks: order?.Remarks,
  };

  const form = useForm<OrderSchema>({
    defaultValues,
    resolver: zodResolver(orderSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = form;

  const deliveryDate = watch("DeliveryDate");

  const onCancel = () => {
    reset(defaultValues);
    onClose();
  };

  const createOrderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (order) {
        await updateOrderMutation.mutateAsync(values);
      } else {
        await createOrderMutation.mutateAsync(values);
      }
    } catch (e) {}

    onClose();
  });

  return (
    <FormProvider {...form}>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${order ? "Edit" : "Create"} Order`}</ModalHeader>
          <Divider />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <SimpleGrid
                gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                spacingX={4}
                spacingY={4}
              >
                <FormControl>
                  <FormLabel>Label</FormLabel>
                  <Input {...register("Label")} />
                  <ErrorMessage errors={errors} name="Label" />
                </FormControl>
                <FormControl>
                  <FormLabel>Reference</FormLabel>
                  <Input {...register("Reference")} />
                  <ErrorMessage errors={errors} name="Reference" />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input {...register("Description")} />
                  <ErrorMessage errors={errors} name="Description" />
                </FormControl>
                <FormControl>
                  <FormLabel>Remarks</FormLabel>
                  <Input {...register("Remarks")} />
                  <ErrorMessage errors={errors} name="Remarks" />
                </FormControl>

                <FormControl>
                  <FormLabel>Delivery Date</FormLabel>
                  <DatePicker
                    onChange={(date) => {
                      if (date) {
                        setValue(
                          "DeliveryDate",
                          new Date(date).toLocaleDateString()
                        );
                      }
                    }}
                    customInput={
                      <Input
                        {...register("DeliveryDate")}
                        name="DeliveryDate"
                      />
                    }
                    dateFormat="MM/dd/yyy"
                    selected={deliveryDate ? new Date(deliveryDate) : undefined}
                  />

                  <ErrorMessage errors={errors} name="DeliveryDate" />
                </FormControl>
              </SimpleGrid>
              <Divider mt={4} />
              <ModalFooter px={0}>
                <HStack>
                  <Button variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    disabled={
                      createOrderMutation.isLoading ||
                      updateOrderMutation.isLoading
                    }
                    isLoading={
                      createOrderMutation.isLoading ||
                      updateOrderMutation.isLoading
                    }
                  >
                    {`${order ? "Update" : "Create"}`}
                  </Button>
                </HStack>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
};

export default OrderForm;
