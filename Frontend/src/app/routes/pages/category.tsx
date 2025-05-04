import Header from "@components/header/header";
import { Flex } from "@radix-ui/themes";
import HeaderGrid from "@components/gestion/headerGrid";
import DataGrid from "@components/gestion/dataGrid";
import { getCategoryColumns} from "@customTypes/columnsDefinitions";
import { Category } from "@customTypes/types";
import FormCategory from "@components/forms/formCategory";
import CustomButton from "@components/ui/formCustomButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDeleteCategory } from "@api/mutations/categoryMutations";

const Actions = ({row}: {row: Category}) => {
    const deleteCategory = useDeleteCategory()

    return (
        <Flex gap="2">
            <FormCategory category={row}/>
            <CustomButton text="Eliminar" leftIcon={<TrashIcon/>} color="red" onClick={() => {if(row.id) deleteCategory.mutate(row?.id)}} />
        </Flex>
    )
}

const CustomerCrud = () => {
    const columns = getCategoryColumns(Actions)

    return (
        <Flex direction="column">
            <Header/>
            <HeaderGrid title="Categorias" >
                <FormCategory/>
            </HeaderGrid>
            <DataGrid<Category> columns={columns} queryKey="categories" url="/categories" />
        </Flex>
    );
};



export default CustomerCrud;
