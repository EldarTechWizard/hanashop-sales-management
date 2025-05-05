import { getData } from "@lib/api"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Avatar, Card, Flex, Text } from "@radix-ui/themes"
import { useSales } from "@stores/salesStore"
import { useQuery } from "@tanstack/react-query"
import { OrderDetail } from "@customTypes/types"
import { useEffect } from "react"

type CartItemCardProps = {
    orderDetail: OrderDetail
}


export const CartItemCard: React.FC<CartItemCardProps> = ({ orderDetail }) => {
    const { sumQuantityToItem, cart} = useSales()

    const { data , isLoading} = useQuery({
        queryKey: [`product`, orderDetail ? orderDetail.product : "0" ],
        queryFn: () => getData(`/products/${orderDetail ? orderDetail.product : "0"}`),
    });

    useEffect(() => {
        console.log(cart)
    },[cart])

    if (isLoading){
        return <></>
    }

    return (
        <Card variant="ghost" >
            <Flex className="w-full p-3" gap="2" >
                <Avatar
                    size="7"
                    src="https://placehold.co/400"
                    radius="medium"
                    fallback="t"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "http://localhost:8000/media/images/default.webp";
                    }}
                />
                <Flex direction="column" className="w-full" justify="between">
                    <Flex direction="column">
                        <Text size="3" weight="medium">
                            { data.name}
                        </Text>
                        <Text size="1" color="gray">
                            ${(data.unit_price).toFixed(2)}
                        </Text>
                    </Flex>

                    <Flex className="w-full pr-1" justify="end">
                        <Flex align="center" gap="4" className="bg-gray-100 rounded-2xl" p="1">
                            <Flex className="rounded-full bg-white" p="2" style={{cursor:"pointer"}} onClick={() => {sumQuantityToItem( orderDetail.product,-1)}}>
                                <MinusIcon height={10} />
                            </Flex>
                            <Text>
                                {orderDetail.quantity}
                            </Text>
                            <Flex className="rounded-full bg-white" p="2" style={{cursor:"pointer"}} onClick={() => {sumQuantityToItem( orderDetail.product, 1)}}>
                                <PlusIcon height={10}  />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </Card>
    )
}