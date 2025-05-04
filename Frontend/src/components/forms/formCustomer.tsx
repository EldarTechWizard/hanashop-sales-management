import DialogScheme from "./dialogScheme"
import { Button, Flex } from "@radix-ui/themes"
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from "@lib/react-form-context"
import { CustomTextField } from "@components/ui/formTextField"
import { CustomerValidator } from "./utils/validators"
import { Customer } from "@customTypes/types"
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import { useRef } from "react"
import { useCreateCustomer, useUpdateCustomer } from "@api/mutations/customerMutations"

type Props = {
    customer?: Customer
}

const { useAppForm } = createFormHook({
    fieldComponents: {
        CustomTextField,
    },
    formComponents: {
        Button,
    },
    fieldContext,
    formContext,
})


const FormCustomer: React.FC<Props> = ({ customer }) => {
    const add = useCreateCustomer()
    const update = useUpdateCustomer()
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useAppForm({
        defaultValues: {
            name: customer?.name || "",
            phone: customer?.phone || "",
            address: customer?.address || ""
        },
        validators: {
            onSubmit: CustomerValidator
        },

        onSubmit: ({ value }) => {
            if (customer === undefined) {
                add.mutate(value)
                closeRef?.current?.click();
            }
            else {
                if (customer.id) {
                    update.mutate({ id: customer.id, data: value })
                    closeRef?.current?.click();
                }
            }
        },
    })


    return (
        <DialogScheme title="Clientes" buttonTitle={customer ? "Editar" : "Agregar cliente"} leftIcon={customer ? <Pencil1Icon /> : <PlusIcon />} closeRef={closeRef}>
            <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} style={{ width: "100%" }}>
                <Flex direction="column" gap="3">
                    <form.AppField
                        name="name"
                        children={(field) => <field.CustomTextField label="Nombre" error={field.state.meta.errors[0]?.message || ""} />}
                    />
                    <form.AppField
                        name="phone"
                        children={(field) => <field.CustomTextField label="Telefono" error={field.state.meta.errors[0]?.message || ""} />}
                    />
                    <form.AppField
                        name="address"
                        children={(field) => <field.CustomTextField label="Domicilio" error={field.state.meta.errors[0]?.message || ""} />}
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

export default FormCustomer;