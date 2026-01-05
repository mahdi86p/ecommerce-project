import { it, expect, vi, beforeEach } from "vitest"
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from "react-router";
import ProductsGrid from "./ProductsGrid.jsx"

it("display Products correct", () => {
    let loadCart;
    let products;

    beforeEach(() => {
        loadCart = vi.fn();

        products = [
            {
                "keywords": [
                    "socks",
                    "sports",
                    "apparel"
                ],
                "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
                "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
                "rating": {
                    "stars": 4.5,
                    "count": 87
                },
                "priceCents": 1090,
                "createdAt": "2025-12-08T06:15:43.625Z",
                "updatedAt": "2025-12-08T06:15:43.625Z"
            },
            {
                "keywords": [
                    "sports",
                    "basketballs"
                ],
                "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                "image": "images/products/intermediate-composite-basketball.jpg",
                "name": "Intermediate Size Basketball",
                "rating": {
                    "stars": 4,
                    "count": 127
                },
                "priceCents": 2095,
                "createdAt": "2025-12-08T06:15:43.626Z",
                "updatedAt": "2025-12-08T06:15:43.626Z"
            }]
    })


    render(
        <MemoryRouter>
            <ProductsGrid products={products} loadCart={loadCart} />
        </MemoryRouter>
    )

})