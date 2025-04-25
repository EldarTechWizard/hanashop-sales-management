import { ReaderIcon, PersonIcon } from "@radix-ui/react-icons";
import { Flex, Text, } from "@radix-ui/themes";


const CartHeader = () => {
    return (
        <Flex justify="between" align="center" className="w-full" py="1" px="3">
            <Flex className="rounded-full bg-gray-100" p="3">
                <ReaderIcon height={10} />
            </Flex>

            <Text size="5" className="p-3">
                Carrito
            </Text>

            <Flex className="rounded-full  bg-gray-100" p="3">
                <PersonIcon height={10} />
            </Flex>

        </Flex>
    )
}


export default CartHeader;