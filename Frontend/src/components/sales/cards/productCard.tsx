import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useSales } from "@stores/salesStore";
import { Product } from "@types/types";

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const { addToCart } = useSales()

    return (
        <Card onClick={()=>{addToCart(product)}} style={{cursor: "pointer"}}>
            <Flex direction="column" gap="1">
                <img
                    src="https://placehold.co/800x400"
                    alt="Bold typography"
                    style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 120,
                        borderRadius: 3,
                        backgroundColor: "var(--gray-5)",
                    }}
                />
                <Text size="1">{product.name}</Text>
                <Box>
                    <Flex justify="between" align="center">
                        <Badge >{product.category}</Badge>
                        <Text className="text-xs">${product.unit_price}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
}


export default ProductCard;