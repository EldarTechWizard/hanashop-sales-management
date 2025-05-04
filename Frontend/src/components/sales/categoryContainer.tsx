import { Flex, ScrollArea } from "@radix-ui/themes";
import CategoryCard from "./cards/categoryCard";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@lib/api";
import { Category } from "@customTypes/types";

const CategoryContainer = () => {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['categories'],
        queryFn: () => getData('/categories'),
    });

    return (
        <Flex className="px-2 w-full">
            <ScrollArea size="1"  scrollbars="horizontal">
                <Flex gap="2">
                    <CategoryCard category={{id: 0, name: "Todos", icon:"", status: true}} />
                    {!isError && data?.map((category : Category) => (
                        <CategoryCard category={category} />
                    ))}
                </Flex>

            </ScrollArea>
        </Flex>
    )
}


export default CategoryContainer;