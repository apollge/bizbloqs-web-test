interface OrderTypeProps {
  OrderTypeId: number;
  DisplayValue: string;
}

export interface ItemProps {
  OrderId?: number;
  Label: string;
  Description?: string;
  Reference?: string;
  Relation?: string;
  Address?: string;
  DeliveryDate: string;
  ShippingDateTime?: string;
  DeliveryMethod?: string;
  OrderType: OrderTypeProps;
  CreateDate: Date;
  Remarks?: string;
  PaymentCondition?: string;
  BillingAddress?: string;
  TradingAddress?: string;
  TradingRelation?: string;
  BillingRelation?: string;
  Owner?: string;
  PackingRemarks?: string;
  Progress: number;
  Status?: string;
  Value: number;
  Currency?: string;
  ToWarehouse?: string;
  FromWarehouse?: string;
  DefaultWarehouse?: string;
  ParkedAt?: string;
  StagedAt: string;
  InProcessBy?: string;
  LastChangedDateTime?: string;
}

export type OrderProps = {
  Items: ItemProps[];
  Count: number;
};
