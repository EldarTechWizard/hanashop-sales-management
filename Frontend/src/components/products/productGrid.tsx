import { Box, Table } from "@radix-ui/themes";
import { Product } from "@types/types";
import { getProductColumns } from "@types/columnsDefinitions"
import { useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import useProduct from "@stores/productStore";


const ProductGrid = () => {
    const [data, setData] = useState<Product[]>([
        {
            id: 1,
            name: "Camiseta Negra",
            color: "Negro",
            description: "Camiseta de algodón de alta calidad",
            unit_price: 19.99,
            minimum_stock_level: 10,
            stock: 50,
            registration_date: new Date("2024-01-15"),
            image: "https://placehold.co/50",
            status: true,
            category: "Ropa",
        },
        {
            id: 2,
            name: "Taza Personalizada",
            color: "Blanco",
            description: "Taza de cerámica con impresión personalizada",
            unit_price: 9.99,
            minimum_stock_level: 5,
            stock: 20,
            registration_date: new Date("2024-02-10"),
            image: "https://placehold.co/50",
            status: true,
            category: "Accesorios",
        },
        {
            id: 3,
            name: "Mousepad Gamer",
            color: "Rojo",
            description: "Mousepad grande con base antideslizante",
            unit_price: 14.99,
            minimum_stock_level: 8,
            stock: 30,
            registration_date: new Date("2024-03-05"),
            image: "https://placehold.co/50",
            status: false,
            category: "Electrónica",
        },
    ]);


    const { setEditMode, setDeleteMode } = useProduct(); // Aquí sí podemos usar el hook

    const handleEdit = (product: Product) => {
        setEditMode(true);
        console.log("Editar producto:", product);
    };

    const handleDelete = (id: number) => {
        setDeleteMode(true);
        console.log("Eliminar producto con ID:", id);
    };


    const columns = getProductColumns(handleEdit, handleDelete);
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

    return (
        <Box className="" px="2" mt="5">
            <Table.Root variant="surface">
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <Table.Header>{
                            headerGroup.headers.map((header) => (
                                <Table.ColumnHeaderCell>{flexRender(header.column.columnDef.header, header.getContext())}</Table.ColumnHeaderCell>
                            ))}
                        </Table.Header>
                    ))
                }
                <Table.Body>
                    {table.getRowModel().rows.map((row) => (
                        <Table.Row key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Table.Cell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table.Root>
        </Box>
    )
}


export default ProductGrid;