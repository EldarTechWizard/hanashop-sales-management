import { Grid } from "@radix-ui/themes"
import { StyledLink } from "./styledLink"


const tabs = [
    {path: "/product", title: "Productos"},
    {path: "/customers", title: "Clientes"},
    {path: "/categories", title: "Categorias"},
    {path: "/orders", title: "Ordenes"},
    {path: "/inventory", title: "Inventario"},
]


const GestionTabView = () => {
    return (
        <Grid columns="4" gap="3" p="2">
            {
                tabs.map((item) => (<StyledLink path={item.path} title={item.title}/>))
            }
        </Grid>
    )
}


export default GestionTabView