export interface Product {
    id: number | null;
    name: string;
    color: string,
    description: string,
    unit_price: number,
    minimum_stock_level: number,
    stock: number,
    registration_date: Date,
    image: string,
    status: boolean,
    category: number
}

export interface Category {
    id: number;
    name: string;
    icon: string;
    status: boolean;
}

export interface OrderDetail {
    id: number | null
    order: number | null;
    product: number;
    quantity: number;
    sub_total: number;
}

export interface Customer {
    id: number;
    name: string;
    phone: string;
    address: string;
    user: number;
    status: boolean;
}

export interface Order {
    id: number | null;
    customer: number | null;
    user: number | null;
    total: number;
    status: boolean
    orders?: OrderDetail[]
}

export interface InventoryMovement {
    id: number | null;
    movement_type: string;
    quantity: number;
    reference: string;
    status: boolean;
    product: number;
}