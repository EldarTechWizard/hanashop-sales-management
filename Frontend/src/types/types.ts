export interface Product {
    id?: number;
    name: string;
    color: string,
    description: string,
    unit_price: number,
    minimum_stock_level: number,
    stock: number,
    registration_date?: Date,
    image: string,
    category: number,
    status?: boolean
}

export interface Category {
    id?: number;
    name: string;
    icon: string;
    status?: boolean;
}

export interface OrderDetail {
    id?: number;
    order?: number;
    product: number;
    quantity: number;
    sub_total: number;
}

export interface Customer {
    id?: number;
    name: string;
    phone: string;
    address: string;
    user?: number;
    status?: boolean;
}

export interface Order {
    id?: number;
    customer?: number;
    user?: number;
    order_date? : Date;
    total: number;
    status: boolean
    orders?: OrderDetail[]
}

export interface InventoryMovement {
    id?: number | null;
    movement_type: string;
    movement_date?: Date;
    quantity: number;
    reference: string;
    status?: boolean;
    product: number;
}

export interface Option {
    value: string;
    label: string;
}

