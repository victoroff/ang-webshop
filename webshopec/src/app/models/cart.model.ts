
export interface Cart{
    items: Array<CartItem>;
}

export interface CartItem{
    product: String;
    name: string;
    price: number;
    quantity: number;
    id: number
}