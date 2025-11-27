import axios from "axios";
import { useState } from "react";
import formatMoney from "../../utils/money"

function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);

    const addToCart = async (product) => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
            // quantity || quantity: quantity
            // Request body
        })
        // create data in backend and send information to backend
        // each request has a type and url path
        // both of these determinr what the backend will do

        await loadCart();
    }

    const selectQuantity = (event) => {
        const quantitySelected = +(event.target.value);
        setQuantity(quantitySelected)
    }

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img src={product.image} alt="" className="product-image" />
            </div>
            <div className="product-name limit-text-to-2-lines" key="pN">
                {product.name}
            </div>
            <div className="product-rating-container">
                <img
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    className='product-rating-stars'
                />
                <div>
                    {product.rating.count}
                </div>
            </div>

            <div className='product-price'>
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
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

            <div className="product-spacer"></div>

            <div className="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    )
}

export default Product;