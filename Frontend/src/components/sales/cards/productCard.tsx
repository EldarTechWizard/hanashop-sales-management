import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useSales } from "@stores/salesStore";
import { Product } from "@customTypes/types";

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useSales()

    return (
        <Card onClick={() => { addToCart(product) }} style={{ cursor: "pointer" }}>
            <Flex direction="column" gap="1">
                <img
                    src={product.image}
                    alt="Bold typography"
                    style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 120,
                        borderRadius: 3,
                        backgroundColor: "var(--gray-5)",
                    }}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "http://localhost:8000/media/images/default.webp";
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