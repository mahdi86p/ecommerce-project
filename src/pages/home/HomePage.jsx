import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSearchParams } from 'react-router';
import Header from '../../components/header/Header';
import HomeIcon from "../../assets/home-favicon.png"
import ProductsGrid from './ProductsGrid.jsx';
import './HomePage.css'
// import CheckmarkIcon from "../../assets/images/icons/checkmark.png"
// import products from '../../../backend/productInfo';

function HomePage({ cart , loadCart }) {
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search')

    useEffect(() => {
        if(search){
            const getHomeData = async() => {
                const response = await axios.get(`/api/products?search=${search}`)
                setProducts(response.data)
            }
    
            getHomeData()
        }
        else{
            const getHomeData = async() => {
                const response = await axios.get("/api/products")
                setProducts(response.data)
            }
    
            getHomeData()
        }
    }, [search])

    return (
        <>
            <title>Home</title>
            <link rel="icon" type="image/icon" href={HomeIcon} />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}

export default HomePage;