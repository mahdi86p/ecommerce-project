import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
// within find things within or inside a specific element
import { MemoryRouter } from 'react-router';
// specifically for testing
import axios from 'axios';
import HomePage from './HomePage';

import userEvent from '@testing-library/user-event';

vi.mock('axios')

// diffrent of (npx vitest) and (npx run vitest)
// npx vitest : 
// - Runs Vitest in watch mode
// - Re-runs tests automatically after saving files
// - Keeps the process running

// npx vitest run : 
// - Runs all tests once
// - Does NOT watch for file changes
// - Exits after tests finish


describe("HomePage Component", () => {
    let loadCart;

    beforeEach(async () => {
        loadCart = vi.fn()

        // same thing as get but it will wait until 
        // it finds this element.
        // wait for homepage to finish loading
        // this is useful when our component 
        // needs to load something and we need
        // to wait for it to load.

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                            stars: 4,
                            count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    },]
                }
            }
        });
    })

    it("display the products correct", async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        )
        // screen.getAllByTestId('product-container')

        // use getAllByTestId insted to wait homepage 
        // to run use effect and then load the products
        // and then update the state

        const productContainers = await screen.findAllByTestId('product-container')

        expect(productContainers.length).toBe(2)

        // product container length is equal 2

        expect(
            within(productContainers[0])
                .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument()

        // check specifically the first product container
        // to see if it has the correct name.

    })
    // check homepage display the products correctly


    // Test add product to cart and buttons work

    it('Add a product to cart', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        )

        const user = userEvent.setup()

        const productContainers = await screen.findAllByTestId('product-container')
        // Find all of products container

        const firstQuantitySelector = await within(productContainers[0]).findByTestId('quantity-selector')

        await user.selectOptions(firstQuantitySelector, '2')

        const firstBtn = within(productContainers[0]).getByTestId('add-to-cart-button')
        await user.click(firstBtn)
        // Get add to cart button in first container , Click the first add to cart button

        expect(axios.post).toHaveBeenNthCalledWith(1,
            "/api/cart-items",
            {
                "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                "quantity": 2
            },
        )
        // test product id and quantity

        const secondQuantitySelector = await within(productContainers[1]).findByTestId('quantity-selector')

        await user.selectOptions(secondQuantitySelector, '3')

        const secondBtn = within(productContainers[1]).getByTestId('add-to-cart-button')
        await user.click(secondBtn)
        // Get add to cart button in second container , Click the second add to cart button

        expect(axios.post).toHaveBeenNthCalledWith(2,
            "/api/cart-items",
            {
                "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                "quantity": 3
            },
        )
        // test product id and quantity

        expect(loadCart).toHaveBeenCalledTimes(2)
    })
})