import "./TrackingPage.css";
import Header from "../../components/header/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import formatMoney from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";
// import dayjs from "dayjs";

function TrackingPage({ cart }) {
    const { orderId, productId } = useParams()
    const [orders, setOrders] = useState(null)
    let [isPreparing, setIsPreparing] = useState();
    let [isShipped, setIsShipped] = useState()
    let [isDelivered, setIsDelivered] = useState(true)

    useEffect(() => {
        const getProductDetails = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrders(response.data)
        }

        getProductDetails()
    }, [orderId])

    if (!orders) return null;

    let thisOrder = orders.products.find((order) => {
        return order.productId == productId
    })

    if (!thisOrder) {
        return <div>products not found</div>
    }

    const totalDeliveryTimeMs = thisOrder.estimatedDeliveryTimeMs - orders.orderTimeMs;
    const currentTime = dayjs().valueOf()
    const timePassedMs = currentTime - orders.orderTimeMs;

    let p = (timePassedMs / totalDeliveryTimeMs) * 100

    // console.log(p , timePassedMs , totalDeliveryTimeMs)

    if (p < 33) {
        setIsPreparing(true);
    }

    else if (p >= 33 && p < 100) {
        setIsShipped(true);
    }

    else if (p == 100) {
        setIsDelivered(true);
    }

    return (<>
        <title>Tracking</title>
        <link rel="icon" type="image" href="./tracking-favicon.png" />

        <Header cart={cart}></Header>

        <div key={thisOrder.productId} className="shopping-product-container">
            <div className="product-image-container">
                <img src={thisOrder.product.image} alt="" className="product-image" />
            </div>
            <div>{p >= 100 ? "Delivered on" : "Arriving on"}</div>
            <div className="productDesc">
                <div className="product-name limit-text-to-2-lines" key="pN">
                    {thisOrder.product.name}
                </div>
                <div className="product-rating-container">
                    <img
                        src={`images/ratings/rating-${thisOrder.product.rating.stars * 10}.png`}
                        className='product-rating-stars'
                    />
                    <div>
                        {thisOrder.product.rating.count}
                    </div>
                </div>

                <div className="product__bottom__style">
                    <div className='product-price'>
                        {formatMoney(thisOrder.product.priceCents)}
                    </div>

                    <div className="product-quantity-container">
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>

                <div className="progress-labels-container">
                    <div className={`progress-label ${isPreparing && 'current-status'}`}>
                        {isPreparing ? "Preparing" : ""}
                    </div>
                    <div className={`progress-label ${isShipped && 'current-status'}`}>
                        {isShipped ? "Shipped" : ""}
                    </div>
                    <div className={`progress-label ${isDelivered && 'current-status'}`}>
                        {isDelivered ? "Delivered" : ""}
                    </div>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar" style={{
                        width: `${p}%`
                    }}></div>
                </div>

                <div className="product-spacer"></div>

                <div className="productAdd">
                    <div className="added-to-cart">
                        <img src="images/icons/checkmark.png" className="checkmarkIcon" />
                        Added
                    </div>

                    <button className="add-to-cart-button button-primary">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default TrackingPage;
