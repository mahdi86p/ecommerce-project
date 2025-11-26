import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummery";
import PaymentSummary from "./PaymentSummery"
import "./CheckoutPage.css"
import "./CheckoutHeader.css"

function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        const getCheckOutPageData = async () => {
            let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            setDeliveryOptions(response.data)
        }

        getCheckOutPageData()
    }, [])

    useEffect(() => {
        const getPaymentSummaryPageData = async () => {
            let response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        }

        getPaymentSummaryPageData()
    }, [cart])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/icon" href="./cart-favicon.png" />

            <div className="checkout-page">
                <CheckoutHeader cart={cart}></CheckoutHeader>
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary
                        cart={cart}
                        deliveryOptions={deliveryOptions}
                        loadCart={loadCart}
                    />

                    <PaymentSummary
                        paymentSummary={paymentSummary}
                        loadCart={loadCart} />
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;