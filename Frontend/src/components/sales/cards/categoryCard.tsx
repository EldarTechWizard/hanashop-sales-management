import { Avatar,  Card, Flex, Text } from "@radix-ui/themes";
import { Category } from "@customTypes/types";
import { useSales } from "@stores/salesStore";

type CategoryCardProps = {
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
    const {selectedCategory, setSelectedCategory} = useSales()

    const style = "bg-white border-2 border-solid border-indigo-400"

    return (
        <Card style={{margin:1, cursor: "pointer"}} variant="ghost" className={selectedCategory?.id === category.id ? style : "bg-white"} size="1" onClick={() => {setSelectedCategory(category)}}>
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