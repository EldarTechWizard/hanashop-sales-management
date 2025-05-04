import DialogScheme from "./dialogScheme"
import { Button, Flex } from "@radix-ui/themes"
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from "@lib/react-form-context"
import { CustomTextField } from "@components/ui/formTextField"
import { ProductValidator } from "./utils/validators"
import { Product } from "@customTypes/types"
import { useRef, useState } from "react"
import ImageUploader from "@components/ui/imagePicker"
import { CustomNumberField } from "@components/ui/formNumberField"
import CustomFormAsyncComboBox from "@components/ui/formAsyncComboBox"
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons"
import { useCreateProduct, useUpdateProduct } from "@api/mutations/productMutations"
import { uploadImage } from "@lib/api"

type Props = {
    product?: Product
}

const { useAppForm } = createFormHook({
    fieldComponents: {
        CustomTextField,
        CustomNumberField,
        CustomFormAsyncComboBox
    },
    formComponents: {
        Button,
    },
    fieldContext,
    formContext,
})


const FormProduct: React.FC<Props> = ({ product }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const add = useCreateProduct()
    const update = useUpdateProduct()
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useAppForm({
        defaultValues: {
            name: product?.name || "",
            color: product?.color || "",
            description: product?.description || "",
            unit_price: product?.unit_price || 0,
            minimum_stock_level: product?.minimum_stock_level || 0,
            stock: product?.stock || 0,
            image: product?.image || "",
            category: product?.category || 1,
        },
        validators: {
            onSubmit: ProductValidator
        },

        onSubmit:async ({ value }) => {
            if(selectedFile)
            {
                const response = await uploadImage(selectedFile);
                value.image = response || ""
            }

            if (product === undefined) {
                add.mutate(value)
                closeRef?.current?.click();
            }
            else {
                if (product.id) {
                    update.mutate({ id: product.id, data: value })
                    closeRef?.current?.click();
                }
            }
        }
    })


    return (
        <DialogScheme title="Producto" buttonTitle={product ? "Editar" : "Agregar producto"} leftIcon={product ? <Pencil1Icon /> : <PlusIcon />} closeRef={closeRef}>
            <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} style={{ width: "100%" }}>
                <Flex direction="column" gap="3" width="100%" gapY="6">
                    <Flex gap="6" width="100%" justify="between">
                        <Flex direction="column" width="100%" gap="2">
                            <form.AppField
                                name="name"
                                children={(field) => <field.CustomTextField label="Nombre" error={field.state.meta.errors[0]?.message || ""} />}
                            />
                            <form.AppField
                                name="color"
                                children={(field) => <field.CustomTextField label="Color" error={field.state.meta.errors[0]?.message || ""} />}
                            />
                            <form.AppField
                                name="description"
                                children={(field) => <field.CustomTextField label="Descripcion" error={field.state.meta.errors[0]?.message || ""} />}
                            />
                        </Flex>
                        <Flex direction="column" width="100%" gap="2">
                            <form.AppField
                                name="unit_price"
                                children={(field) => <field.CustomNumberField label="Precio unitario" error={field.state.meta.errors[0]?.message || ""} />}
                            />
                            <form.AppField
                                name="minimum_stock_level"
                                children={(field) => <field.CustomNumberField label="Nivel de stock minimo" error={field.state.meta.errors[0]?.message || ""} />}
                            />
                            <form.AppField
                                name="stock"
                                children={(field) => <field.CustomNumberField label="Stock" error={field.state.meta.errors[0]?.message || ""}  disable={product === undefined ? false: true} />}
                            />
                        </Flex>
                        <Flex direction="column" width="100%" >
                            <form.AppField
                                name="category"
                                children={(field) => <field.CustomFormAsyncComboBox url="categories/" label="Categoria" error={field.state.meta.errors[0]?.message || ""} />}
                            />

                        </Flex>
                        <Flex direction="column" width="100%">
                            <form.AppField
                                name="image"
                                children={(field) => <ImageUploader onFileSelect={setSelectedFile} label="Imagen" image={field.state.value} />}
                            />
                        </Flex>
                    </Flex>



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

export default FormProduct;