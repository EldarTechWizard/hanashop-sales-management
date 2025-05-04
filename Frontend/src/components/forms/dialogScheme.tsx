import CustomButton from "@components/ui/formCustomButton";
import { AlertDialog, ButtonProps, Flex } from "@radix-ui/themes";

type ButtonColor = NonNullable<ButtonProps["color"]>;
type Props = {
    children?: string | JSX.Element | JSX.Element[];
    title?: string
    buttonTitle?: string
    description?: string
    color?: ButtonColor
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    closeRef?: React.RefObject<HTMLButtonElement>;
}

const DialogScheme = ({ children, title = "", buttonTitle = "", description = "", color = "indigo", leftIcon = null, rightIcon = null, closeRef }: Props) => {

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <CustomButton color={color} text={buttonTitle} leftIcon={leftIcon} rightIcon={rightIcon} />
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="800px">
                <Flex justify="between" align="center" width="100%">
                    <AlertDialog.Title>{title}</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button ref={closeRef} aria-label="Cerrar" />
                    </AlertDialog.Cancel>
                </Flex>

                <AlertDialog.Description size="2">
                    {description}
                </AlertDialog.Description>

                <Flex width="100%">
                    {children}
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DialogScheme