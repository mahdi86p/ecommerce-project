import { Link } from "react-router"
import Logo from "../../assets/images/logo.png"
import MobileLogo from "../../assets/images/mobile-logo.png"
import CheckOutLock from "../../assets/images/icons/checkout-lock-icon.png"

function CheckoutHeader({cart}) {
    let allQuantity = 0;

    cart.map((eachCart) => {
        allQuantity += eachCart.quantity
    })

    // let productsTotal = cart
    return (
        <div className="checkout-header">
            <title>Checkout</title>
            <link rel="icon" href={CheckOutLock} />
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <img className="logo" src={Logo} />
                        <img className="mobile-logo" src={MobileLogo} />
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">{allQuantity} items   </Link>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={CheckOutLock} />
                </div>
            </div>
        </div>
    )
}

export default CheckoutHeader;