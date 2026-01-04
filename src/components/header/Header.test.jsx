import { it, expect, describe, beforeEach, vi } from "vitest";
// describe → گروه‌بندی تست‌ها
// it → تعریف یک تست
// beforeEach → اجرا قبل از هر تست

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router"

// چون Header احتمالاً Link یا useNavigate داره
// MemoryRouter محیط routing فیک برای تست فراهم می‌کنه

import Header from "./Header";
import userEvent from "@testing-library/user-event";

import Location from "../Location/Location";

describe("Test Header Component", () => {
    let cart;
    let user;

    beforeEach(() => {
        cart = [
            {
                "id": 8,
                "productId": "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
                "quantity": 8,
                "deliveryOptionId": "1",
                "createdAt": "2025-12-09T05:42:49.645Z",
                "updatedAt": "2025-12-14T14:48:59.838Z"
            },
            {
                "id": 9,
                "productId": "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
                "quantity": 1,
                "deliveryOptionId": "1",
                "createdAt": "2025-12-11T09:26:56.384Z",
                "updatedAt": "2025-12-11T09:26:56.384Z"
            },
            {
                "id": 10,
                "productId": "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
                "quantity": 3,
                "deliveryOptionId": "1",
                "createdAt": "2025-12-11T09:28:04.872Z",
                "updatedAt": "2025-12-12T05:55:51.089Z"
            },
            {
                "id": 11,
                "productId": "d2785924-743d-49b3-8f03-ec258e640503",
                "quantity": 1,
                "deliveryOptionId": "1",
                "createdAt": "2025-12-14T14:49:34.770Z",
                "updatedAt": "2025-12-14T14:49:34.770Z"
            }
        ]

        user = userEvent.setup()
    })

    it("Search with key Work or not", async () => {
        const searchHandler = vi.fn()

        render(
            <MemoryRouter>
                <Header
                    cart={cart}
                    searchHandler={searchHandler}
                />
            </MemoryRouter>
        )

        const searchInput = await screen.findByTestId("search-input");

        await user.type(searchInput, "shirt{Enter}")

        expect(searchHandler).toBeCalled();
        expect(searchHandler).toHaveBeenCalledWith("/?search=shirt");
    })


    it("Search with button work or not", async () => {
        const searchHandler = vi.fn()

        render(
            <MemoryRouter>
                <Header
                    cart={cart}
                    searchHandler={searchHandler}
                />
            </MemoryRouter>
        )

        const searchBtn = await screen.findByTestId("search-button")
        const searchInput = await screen.findByTestId("search-input")

        await user.type(searchInput, "shoes")

        await user.click(searchBtn)

        expect(searchHandler).toBeCalled()
        expect(searchHandler).toHaveBeenCalledWith("/?search=shoes")
    })

    it("Link to orders Work or not:", async () => {
        render(
            <MemoryRouter>
                <Header
                    cart={cart}
                />
                <Location />
            </MemoryRouter>
        )

        const ordersLink = await screen.findByTestId("orders-link")

        await user.click(ordersLink)

        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    })

    it("Link to checkout Work or not:", async () => {
        render(
            <MemoryRouter>
                <Header
                    cart={cart}>
                </Header>
                <Location></Location>
            </MemoryRouter>
        )

        const cartLink = await screen.findByTestId("cart-link")

        await user.click(cartLink)

        expect(await screen.findByTestId('url-path')).toHaveTextContent('/checkout')
    })
})