import { postData } from "@lib/api";
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useSales } from "@stores/salesStore";

type CartProccessPaymentProps = {

}

const CartProccessPayment = () => {
    const { cart, total, deleteFromCart } = useSales();

    const ProcessPayment = async () => {
        const data = {
            id: null,
            customer: 1,
            user: null,
            total: total,
            status: true,
            orders: cart
        }

        const result = await postData("/orders/", data)

        if(result){
            deleteFromCart();
        }
    }



    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button className="w-full p-0" size="4" radius="none" style={{ background: "#2C72F7", cursor: cart.length ? "pointer": "" }}  disabled={cart.length ? false: true}>Pagar</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Finalizar compra</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    La informacion solicitada es correcta?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancelar
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="blue" onClick={ ProcessPayment}>
                            Comprar
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        )
}

export default CartProccessPayment;