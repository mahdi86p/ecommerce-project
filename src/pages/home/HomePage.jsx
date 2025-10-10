import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import HomeIcon from "../../assets/home-favicon.png"
import ProductsGrid from './ProductsGrid.jsx';
import './HomePage.css'
// import CheckmarkIcon from "../../assets/images/icons/checkmark.png"
// import products from '../../../backend/productInfo';

function HomePage({ cart }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getHomeData = async() => {
            const response = await axios.get("/api/products")
            setProducts(response.data)
        }

        getHomeData()
    }, [])

    return (
        <>
            <title>Home</title>
            <link rel="icon" type="image/icon" href={HomeIcon} />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}

export default HomePage;