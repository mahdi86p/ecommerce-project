import axios from "axios"
import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import HomePage from "./pages/home/HomePage"
import CheckoutPage from "./pages/checkout/CheckoutPage"
import OrdersPage from "./pages/orders/OrdersPage"
import TrackingPage from "./pages/tracking/TrackingPage"
import UndefindPage from "./pages/undefind/UndefindPage"
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getAppData = async() => {
      const response = await axios.get("/api/cart-items?expand=product")
      setCart(response.data)
    }

    getAppData()
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart}/>} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<UndefindPage />} />
      </Routes>
    </>
  )
}

export default App
