import { Box, Flex, Grid, ScrollArea } from "@radix-ui/themes";
import ProductCard from "./cards/productCard";
import { getData } from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@types/types";
import { useSales } from "@stores/salesStore";

const ProductContainer = () => {
    const { selectedCategory, searchText } = useSales()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => getData('/products'),
    });

    return (
        <ScrollArea scrollbars="vertical">
            <Grid columns="4" gap="3" p="2">
                {!isError &&
                    data
                        ?.filter((item: Product) => {
                            const matchCategory =
                                !selectedCategory?.id || selectedCategory.id === 0
                                    ? true
                                    : item.category === selectedCategory.id;

                            const matchSearch = item.name
                                .toLowerCase()
                                .includes(searchText.toLowerCase());

                            return matchCategory && matchSearch;
                        })
                        .map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
            </Grid>
        </ScrollArea>
    )
}

export default ProductContainer;