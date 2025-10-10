import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import OrderSummery from "./OrderSummery";
import PaymentSummery from "./PaymentSummery"
import "./CheckoutPage.css"
import "./CheckoutHeader.css"

function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummery, setPaymentSummery] = useState(null)

    useEffect(() => {
        const getCheckOutPageData = async () => {
            let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            setDeliveryOptions(response.data)


            response = await axios.get('/api/payment-summary')
            setPaymentSummery(response.data)
        }

        getCheckOutPageData()
    }, [])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/icon" href="./cart-favicon.png" />

            <div className="checkout-page">
                <CheckoutHeader cart={cart}></CheckoutHeader>
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummery
                        cart={cart}
                        deliveryOptions={deliveryOptions}
                    />

                    <PaymentSummery
                        paymentSummery={paymentSummery} />
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;