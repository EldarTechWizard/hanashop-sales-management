import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./types";
import { format } from "date-fns";
import { Button } from "@radix-ui/themes";

export const getProductColumns = (handleEdit: (product: Product) => void, handleDelete: (id: number) => void): ColumnDef<Product>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "unit_price",
    header: "Precio Unitario",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "minimum_stock_level",
    header: "Stock Mínimo",
  },
  {
    accessorKey: "stock",
    header: "Stock Actual",
  },
  {
    accessorKey: "registration_date",
    header: "Fecha de Registro",
    cell: ({ getValue }) => format(new Date(getValue<Date>()), "dd/MM/yyyy"),
  },
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ getValue }) => (
      <img src={getValue<string>()} alt="Producto" width={50} height={50} />
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ getValue }) => (getValue<boolean>() ? "Activo" : "Inactivo"),
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => handleEdit(product)}>Editar</Button>
          <Button onClick={() => handleDelete(product.id)} variant="solid" color="red">
            Eliminar
          </Button>
        </div>
      );
    },
  },
];
