import OrderHeader from './OrderHeader';
import OrderDetailsGrid from './OrderDetailsGrid';
import { useState , useEffect} from "react";

function OrdersGrid({ orders , cart , loadCart}) {
    
    let [quantities, setQuantityes] = useState({})

    useEffect(() => {
        console.log("Quantity changed: ", quantities);
        console.log("cart: " + cart)
    }, [quantities]);
    
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                async function AddProduct() {
                    setQuantityes(quantity => ++quantity)
                }
                
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order}></OrderHeader>
                        <OrderDetailsGrid order={order}></OrderDetailsGrid>
                        <button onClick={AddProduct} className="addButton">Add to Cart</button>
                    </div>
                );
            })}
        </div>
    )
}

export default OrdersGrid;