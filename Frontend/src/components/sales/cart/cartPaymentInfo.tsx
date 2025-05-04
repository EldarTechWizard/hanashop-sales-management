import { Flex, Text } from "@radix-ui/themes"
import { useSales } from "@stores/salesStore"


export const CartPaymentInfo = () => {
    const {total} = useSales();

    return (
        <Flex direction="column" className="w-full" p="4">
            <Flex direction="column">
                <Flex justify="between">
                    <Text color="gray">Subtotal:</Text>
                    <Flex gap="2" width="80px"  justify="between">
                        <Text color="gray">$</Text>
                        <Text color="gray">{total.toFixed(2)}</Text>
                    </Flex>
                </Flex>
                <Flex justify="between">
                    <Text weight="medium">Total:</Text>
                    <Flex gap="2" width="80px"  justify="between">
                        <Text  weight="medium">$</Text>
                        <Text  weight="medium">{total.toFixed(2)}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}