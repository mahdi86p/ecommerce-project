import OrderHeader from './OrderHeader';
import OrderDetailsGrid from './OrderDetailsGrid';
import axios from 'axios';

function OrdersGrid({ orders, loadCart }) {

    return (
        <div className="orders-grid">
            {orders.map((order) => {
                const addToCart = async (product) => {
                    await axios.post('/api/cart-items', {
                        productId: product.id,
                        quantity: product.quantity
                        // quantity || quantity: quantity
                        // Request body
                    })
                    // create data in backend and send information to backend
                    // each request has a type and url path
                    // both of these determinr what the backend will do

                    await loadCart();
                }

                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order}></OrderHeader>
                        <OrderDetailsGrid order={order}></OrderDetailsGrid>
                        <button onClick={addToCart} className="addButton">Add to Cart</button>
                    </div>
                );
            })}
        </div>
    )
}

export default OrdersGrid;