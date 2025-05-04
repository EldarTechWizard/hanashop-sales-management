import DialogScheme from "./dialogScheme"
import { Button, Flex } from "@radix-ui/themes"
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from "@lib/react-form-context"
import { CustomTextField } from "@components/ui/formTextField"
import { InventoryValidator } from "./utils/validators"
import { InventoryMovement } from "@customTypes/types"
import { CustomNumberField } from "@components/ui/formNumberField"
import { CustomComboBoxField } from "@components/ui/formComboBox"
import CustomFormAsyncComboBox from "@components/ui/formAsyncComboBox"
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import { useCreateInventoryMovement, useUpdateInventoryMovement } from "@api/mutations/inventoryMutations"
import { useRef } from "react"


type Props = {
    inventory?: InventoryMovement
}

const { useAppForm } = createFormHook({
    fieldComponents: {
        CustomTextField,
        CustomNumberField,
        CustomComboBoxField,
        CustomFormAsyncComboBox,
    },
    formComponents: {
        Button,
    },
    fieldContext,
    formContext,
})



const FormInventoryMovement: React.FC<Props> = ({ inventory }) => {
    const add = useCreateInventoryMovement()
    const update = useUpdateInventoryMovement()
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useAppForm({
        defaultValues: {
            movement_type: inventory?.movement_type || "IN",
            product: inventory?.product || 0,
            quantity: inventory?.quantity || 0,
            reference: inventory?.reference || "",
        },
        validators: {
            onSubmit: InventoryValidator
        },

        onSubmit: ({ value }) => {
            if (inventory === undefined) {
                add.mutate(value)
                closeRef?.current?.click();
            }
            else {
                if (inventory.id) {
                    update.mutate({ id: inventory.id, data: value })
                    closeRef?.current?.click();
                }
            }
        }
    })


    return (
        <DialogScheme title="Movimiento de inventario" buttonTitle={inventory ? "Editar " : "Agregar movimiento"} leftIcon={inventory ? <Pencil1Icon /> : <PlusIcon />} closeRef={closeRef}>
            <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} style={{ width: "100%" }}>
                <Flex direction="column" gap="3">
                    <form.AppField
                        name="movement_type"
                        children={(field) => <field.CustomComboBoxField options={[{ label: "Entrada", value: "IN" }, { label: "Salida", value: "OUT" }]} label="Movimiento" error={field.state.meta.errors[0]?.message || ""} />}
                    />
                    <form.AppField
                        name="product"
                        children={(field) => <field.CustomFormAsyncComboBox url="products/" label="Producto" error={field.state.meta.errors[0]?.message || ""} disable={inventory=== undefined ? false:true}/>}
                    />
                    <form.AppField
                        name="quantity"
                        children={(field) => <field.CustomNumberField label="Cantidad" error={field.state.meta.errors[0]?.message || ""} />}
                    />
                    <form.AppField
                        name="reference"
                        children={(field) => <field.CustomTextField label="Referencia" error={field.state.meta.errors[0]?.message || ""} />}
                    />
                    <form.AppForm>
                        <form.Button>
                            Guardar
                        </form.Button>
                    </form.AppForm>
                </Flex>

            </form>
        </DialogScheme>
    )
}

export default FormInventoryMovement;