import DialogScheme from "./dialogScheme"
import { Button, Flex } from "@radix-ui/themes"
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from "@lib/react-form-context"
import { CustomTextField } from "@components/ui/formTextField"
import { CategoryValidator } from "./utils/validators"
import { Category } from "@customTypes/types"
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import { useCreateCategory, useUpdateCategory } from "@api/mutations/categoryMutations"
import { useRef } from "react"

type Props = {
    category?: Category
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


const FormCategory: React.FC<Props> = ({ category }) => {
    const add = useCreateCategory()
    const update = useUpdateCategory()
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useAppForm({
        defaultValues: {
            name: category?.name || "",
            icon: category === undefined ? "" : category.icon,
        },
        validators: {
            onSubmit: CategoryValidator
        },

        onSubmit: ({ value }) => {
            if (category === undefined) {
                add.mutate(value)
                closeRef?.current?.click();
            }
            else {
                if (category.id) {
                    update.mutate({ id: category.id, data: value })
                    closeRef?.current?.click();
                }
            }
        },
    })


    return (
        <DialogScheme
            title="Categoria"
            buttonTitle={category ? "Editar" : "Agregar categoria"}
            leftIcon={category ? <Pencil1Icon /> : <PlusIcon />}
            closeRef={closeRef}
        >

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                    closeRef.current?.click(); // ✅ Cierra el diálogo
                }}
                style={{ width: "100%" }}
            >
                <Flex direction="column" gap="3">
                    <form.AppField
                        name="name"
                        children={(field) => (
                            <field.CustomTextField
                                label="Nombre"
                                error={field.state.meta.errors[0]?.message || ""}
                            />
                        )}
                    />
                    <form.AppField
                        name="icon"
                        children={(field) => (
                            <field.CustomTextField
                                label="Icono"
                                error={field.state.meta.errors[0]?.message || ""}
                            />
                        )}
                    />
                    <form.AppForm>
                        <form.Button>Guardar</form.Button>
                    </form.AppForm>
                </Flex>
            </form>
        </DialogScheme>
    )
}

export default FormCategory;