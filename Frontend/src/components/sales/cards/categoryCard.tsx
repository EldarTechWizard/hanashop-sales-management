import { Avatar,  Card, Flex, Text } from "@radix-ui/themes";
import { Category } from "@types/types";
import { useSales } from "@stores/salesStore";

type CategoryCardProps = {
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
    const {selectedCategory, setSelectedCategory} = useSales()

    return (
        <Card style={{margin:1, cursor: "pointer"}} variant="ghost" className="bg-white" size="1" onClick={() => {setSelectedCategory(category)}}>
            <Flex direction="column" width="90px" className="p-1">
                <Avatar
                    size="3"
                    src="https://placehold.co/400"
                    radius="full"
                    fallback="t"
                />
                <Text size="3">
                    {category.name}
                </Text>
                <Text size="1" color="gray">
                    102 Items
                </Text>
            </Flex>

        </Card>
    )
}

export default CategoryCard;