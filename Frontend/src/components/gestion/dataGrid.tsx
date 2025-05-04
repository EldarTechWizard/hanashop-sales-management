import { Box, Spinner, Table, Text } from "@radix-ui/themes";
import React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query";
import { getData } from "@lib/api";


type DataProps<T> = {
  queryKey: string
  url: string;
  columns: ColumnDef<T>[];
}

const DataGrid = <T,>({queryKey, url, columns }: DataProps<T>): React.ReactElement => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [queryKey],
        queryFn: () => getData(url),
    });
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

    if(isLoading){
        return (
            <Spinner size="3" />
        )
    }

    if(isError){
        return (
            <Text>
                Error: {error.message}
            </Text>
        )
    }

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


export default DataGrid;