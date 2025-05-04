import {Flex } from "@radix-ui/themes";
import CartHeader from "./cart/cartHeader";
import { Separator } from "./utils/separator";
import { CartItems } from "./cart/cartItems";
import { CartPaymentInfo } from "./cart/cartPaymentInfo";
import CartProccessPayment from "./cart/cartProcessPayment";


const CartContainer = () => {
    return (
        <Flex direction="column" justify="between" className="w-full bg-white">
            <CartHeader />
            <Separator />
            <CartItems />
            <Separator />
            <CartPaymentInfo />
            <CartProccessPayment/>
        </Flex>
    )
}


export default CartContainer;