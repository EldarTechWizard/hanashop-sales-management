import { ColumnDef } from "@tanstack/react-table";
import { Product, Order, Category, InventoryMovement, Customer } from "./types";
import { format } from "date-fns";

export const getProductColumns = (ActionComponent: React.ComponentType<{ row: Product }>): ColumnDef<Product>[] => [
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
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `$${(value ?? 0).toFixed(2)}`;
    }
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
    cell: ({ getValue }) => {
      const rawValue = getValue<Date | string | undefined>();
      const date = rawValue ? new Date(rawValue) : null;
      return date && !isNaN(date.getTime()) ? format(date, "dd/MM/yyyy") : "";
    }
  },
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ getValue }) => {
      const path = getValue<string>();
      return (
        <img src={path} alt="Producto" width={50} height={50}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "http://localhost:8000/media/images/default.webp";
          }}
        />
      )
    },
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
        <ActionComponent row={product} />
      );
    },
  },
];

export const getOrderColumns = (ActionComponent: React.ComponentType<{ row: Order }>): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "user",
    header: "Usuario",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <ActionComponent row={order} />
      );
    },
  },
]

export const getCategoryColumns = (ActionComponent: React.ComponentType<{ row: Category }>): ColumnDef<Category>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "icon",
    header: "Icono",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionComponent row={category} />
      );
    },
  },
]

export const getCustomerColumns = (ActionComponent: React.ComponentType<{ row: Customer }>): ColumnDef<Customer>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "address",
    header: "Direccion",
  },
  {
    accessorKey: "user",
    header: "Usuario",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <ActionComponent row={customer} />
      );
    },
  },
]

export const getInventoryColumns = (ActionComponent: React.ComponentType<{ row: InventoryMovement }>): ColumnDef<InventoryMovement>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "movement_type",
    header: "Tipo",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `${(value ?? 0)}`;
    }
  },
  {
    accessorKey: "reference",
    header: "Referencia",
  },
  {
    accessorKey: "product",
    header: "Producto",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const inventory = row.original;
      return (
        <ActionComponent row={inventory} />
      );
    },
  },
]
