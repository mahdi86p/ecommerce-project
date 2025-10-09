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
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOptions(response.data)
            })


        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummery(response.data)
            })
    }, [])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/icon" href="./cart-favicon.png" />

            <div className="checkout-page">
                <CheckoutHeader></CheckoutHeader>
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummery 
                        cart={cart} 
                        deliveryOptions={deliveryOptions}
                    />
                
                    <PaymentSummery 
                        paymentSummery={paymentSummery}/>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;