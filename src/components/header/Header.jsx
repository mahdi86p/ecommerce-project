import { NavLink } from 'react-router'
import SearchIcon from "../../assets/images/icons/search-icon.png"
import CartIcon from "../../assets/images/icons/cart-icon.png"
import LogoWhite from '../../assets/images/logo-white.png';
import MobileLogoWhite from '../../assets/images/mobile-logo-white.png';
import "./Header.css"
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Header({ cart, searchHandler }) {
    let totalQuantity = 0;
    let navigate = useNavigate();
    const [InputVal, setInputVal] = useState("")

    cart.map(item => {
        totalQuantity += item.quantity;
    })

    function SearchBtnManagment() {
        searchHandler(`/?search=${InputVal}`)
        navigate(`/?search=${InputVal}`)
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            searchHandler(`/?search=${InputVal}`)
            navigate(`/?search=${InputVal}`)
        }
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" data-testid="search-input" onChange={(e) => setInputVal(e.target.value)} onKeyDown={handleKeyDown} />

                <button className="search-button" onClick={SearchBtnManagment} data-testid="search-button">
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders" data-testid="orders-link">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout" data-testid="cart-link">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;