import Product from "../../components/Product/Product.jsx";

function ProductsGrid({ products, loadCart }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} loadCart={loadCart} />
                )
            })}
        </div>
    )
}

export default ProductsGrid;