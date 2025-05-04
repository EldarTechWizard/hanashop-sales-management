import {z} from "zod"

export const CategoryValidator = z.object(
    {
        name: z.string().min(1,"El nombre es requerido"),
        icon: z.string()
    }
)

export const CustomerValidator = z.object(
    {
        name: z.string().min(1,"El nombre es requerido"),
        phone: z.string().regex(new RegExp(/^([0-9]{10})?$/),"Deben ser 10 digitos numericos").max(10,"Maximo 10 digitos"),
        address: z.string(),
    }
)

export const InventoryValidator = z.object(
    {
        movement_type: z.enum(['IN',"OUT","Out","In"]),
        product: z.number().positive(),
        quantity: z.number().nonnegative().int(),
        reference: z.string(),
    }
)

export const ProductValidator = z.object(
    {
        category: z.number().positive(),
        name: z.string().min(1,"El nombre es requerido"),
        color: z.string(),
        description: z.string(),
        unit_price: z.number().nonnegative(),
        minimum_stock_level: z.number().int().nonnegative(),
        stock: z.number().int().nonnegative(),
        image: z.string(),
    }
)