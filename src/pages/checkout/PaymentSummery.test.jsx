import { it, expect, describe, vi, beforeEach } from "vitest"
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PaymentSummary from "./PaymentSummery.jsx"
import userEvent from '@testing-library/user-event';
import axios from "axios"
import Location from "../../components/Location/Location.jsx";

vi.mock("axios")

describe("Test Payment Summery", () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            totalItems: 13,
            productCostCents: 38712,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 38712,
            taxCents: 3871,
            totalCostCents: 42583
        }

        loadCart = vi.fn()
        user = userEvent.setup()
    })

    // test display dollar amounts
    it("display dollar amounts", async () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                >

                </PaymentSummary>
            </MemoryRouter>
        )


        expect(
            within(screen.getByTestId("payment-summary-product-cost"))
                .getByText("$387.12")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("payment-summary-product-cost")
        ).toHaveTextContent("Items (13):")

        expect(
            screen.getByTestId("shippingCostCents")
        ).toHaveTextContent("$0.00")

        expect(
            screen.getByTestId("totalCostBeforeTaxCents")
        ).toHaveTextContent("$387.12")

        expect(
            screen.getByTestId("taxCents")
        ).toHaveTextContent("$38.71")

        expect(
            screen.getByTestId("totalCostCents")
        ).toHaveTextContent("$425.83")
    })

    // Place order button Does work or notand and check the Location?

    it("Place Order Button work and check the Location", async () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
                <Location />
            </MemoryRouter>
        )

        const placeOrderBtn = screen.getByTestId("place-order-button");
        await user.click(placeOrderBtn);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    })

})