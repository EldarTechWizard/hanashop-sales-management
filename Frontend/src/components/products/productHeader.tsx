import { Button, Flex, Text } from "@radix-ui/themes";

const ProductHeader = () => {
    return (
        <Flex justify="between" align="center" px="2" mt="5">
            <Text weight="bold" size="7">Productos</Text>
            <Button>Agregar producto</Button>
        </Flex>
    )
}


export default ProductHeader;