import Header from "@components/header/header";
import { Flex } from "@radix-ui/themes";
import HeaderGrid from "@components/gestion/headerGrid";
import FormCustomer from "@components/forms/formCustomer";
import DataGrid from "@components/gestion/dataGrid";
import { getCustomerColumns } from "@customTypes/columnsDefinitions";
import { Customer } from "@customTypes/types";
import CustomButton from "@components/ui/formCustomButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDeleteCustomer } from "@api/mutations/customerMutations";

const Actions = ({row}: {row: Customer}) => {
    const deleteCustomer = useDeleteCustomer()

    return (
        <Flex>
            <FormCustomer customer={row}/>
            <CustomButton text="Eliminar" leftIcon={<TrashIcon/> } color="red" onClick={() => {if(row.id) deleteCustomer.mutate(row?.id)}} />
        </Flex>
    )
}

const CustomerCrud = () => {
    const columns = getCustomerColumns(Actions)

    return (
        <Flex direction="column">
            <Header/>
            <HeaderGrid title="Clientes" >
                <FormCustomer/>
            </HeaderGrid>
            <DataGrid<Customer> columns={columns} queryKey="customers" url="/customers" />
        </Flex>
    );
};



export default CustomerCrud;
