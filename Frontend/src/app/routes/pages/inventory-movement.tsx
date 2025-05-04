import Header from "@components/header/header";
import { Flex } from "@radix-ui/themes";
import HeaderGrid from "@components/gestion/headerGrid";
import DataGrid from "@components/gestion/dataGrid";
import {getInventoryColumns } from "@customTypes/columnsDefinitions";
import { InventoryMovement } from "@customTypes/types";
import FormInventoryMovement from "@components/forms/formInventoryMovement";
import CustomButton from "@components/ui/formCustomButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDeleteInventoryMovement } from "@api/mutations/inventoryMutations";

const Actions = ({row}: {row: InventoryMovement}) => {
    const deleteInventoryMovement = useDeleteInventoryMovement()
    return (
        <Flex gap="2">
            <FormInventoryMovement inventory={row}/>
            <CustomButton text="Eliminar" leftIcon={<TrashIcon/>} color="red" onClick={() => {if(row.id) deleteInventoryMovement.mutate(row?.id)}}/>
        </Flex>
    )
}

const CustomerCrud = () => {
    const columns = getInventoryColumns(Actions)

    return (
        <Flex direction="column">
            <Header/>
            <HeaderGrid title="Movimientos de inventario" >
                <FormInventoryMovement/>
            </HeaderGrid>
            <DataGrid<InventoryMovement> columns={columns} queryKey="inventory-movements" url="/inventory_movements" />
        </Flex>
    );
};



export default CustomerCrud;
