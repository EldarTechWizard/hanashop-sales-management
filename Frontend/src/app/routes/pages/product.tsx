import Header from "@components/header/header";
import { Flex } from "@radix-ui/themes";
import { Product } from "@customTypes/types";
import FormProduct from "@components/forms/formProduct";
import HeaderGrid from "@components/gestion/headerGrid";
import DataGrid from "@components/gestion/dataGrid";
import { getProductColumns } from "@customTypes/columnsDefinitions";
import CustomButton from "@components/ui/formCustomButton";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDeleteProduct } from "@api/mutations/productMutations";

const Actions = ({row}: {row: Product}) => {
    const deleteProduct = useDeleteProduct()
    return (
        <Flex gap="2">
            <FormProduct product={row}/>
            <CustomButton text="Eliminar" leftIcon={<TrashIcon/>} color="red" onClick={() => {if(row.id) deleteProduct.mutate(row?.id)}}/>
        </Flex>
    )
}

const ProductCrud = () => {
    const columns = getProductColumns(Actions)

    return (
        <Flex direction="column">
            <Header/>
            <HeaderGrid title="Productos" >
                <FormProduct/>
            </HeaderGrid>
            <DataGrid<Product> columns={columns} queryKey="products" url="/products" />
        </Flex>
    );
};



export default ProductCrud;
