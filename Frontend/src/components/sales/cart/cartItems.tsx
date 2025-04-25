import { Flex, ScrollArea, Separator } from "@radix-ui/themes"
import { CartItemCard } from "../cards/cartItemCard"
import { useSales } from "@stores/salesStore"

export const CartItems = () => {
    const { cart } = useSales()


    return (
        <ScrollArea scrollbars="vertical">
            <Flex className="w-full h-full" direction="column">
                {
                    cart?.map((item) => (
                        <>
                            <CartItemCard orderDetail={item} />
                            <Separator size="4" />
                        </>
                    ))
                }

            </Flex>
        </ScrollArea>

    )
}