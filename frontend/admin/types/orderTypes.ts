export type OrderedItem = {
    name: string;
    quantity: number;
  };
  
export interface Order {
    order_no: number;
    key: string;
    customer: string;
    total: string;
    status: string;
    items: OrderedItem[];
}

export interface OrdersTableProps {
    data: Order[];
    loading: boolean;
}