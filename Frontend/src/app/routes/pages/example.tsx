
import FormInventoryMovement from "@components/forms/formInventoryMovement";
import FormProduct from "@components/forms/formProduct";


const Example: React.FC = () => {
    return (
        <div>
            <FormProduct product={{id:1,name:"hello",color:"red",description:"", unit_price:0.23,stock:2,minimum_stock_level:1,registration_date:new Date("21-01-2003"),category:3,image:"http://localhost:8000/media/images/fetchimage.jpg"}}/>
            <FormInventoryMovement inventory={{id:1,movement_type:"OUT", product:1,quantity:4, reference:"HEEEE"}}/>
        </div>
    )
};

export default Example;