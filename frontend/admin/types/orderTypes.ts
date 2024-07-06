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
    booking_date: string;
    num_guests: number;
}

export interface OrdersTableProps {
    data: Order[];
    loading: boolean;
}