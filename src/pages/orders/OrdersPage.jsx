import Header from '../../components/header/Header';
import "./OrdersPage.css"
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import OrdersGrid from '../../components/OrdersGrid';

function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const response = await axios.get('/api/orders?expand=products')
            setOrders(response.data)
        }

        getOrders()
    }, [])

    return (
        <>
            <link rel="icon" type="image/icon" href="./orders-favicon.png" />
            <title>Orders</title>

            <Header cart={cart}></Header>

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} ></OrdersGrid>
            </div>
        </>
    )
}

export default OrdersPage;