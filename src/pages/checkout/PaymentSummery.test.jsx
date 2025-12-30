import { it, expect, describe, vi, beforeEach } from "vitest"
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PaymentSummary from "./PaymentSummery.jsx"
// import axios from "axios"

import userEvent from '@testing-library/user-event';

// vi.mock("axios")
// vi.mock('')


describe("Payment Summary Component", () => {
    let paymentSummary;
    let loadCart;

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
    })

    // test display dollar amounts
    it("display dollar amounts", async () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
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

    // test Place order work?
    it("Place Order Button work", () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
            </MemoryRouter>
        )

        const user = userEvent.setup();
        const placeOrderBtn = screen.getByTestId("place-order-button");
        user.click(placeOrderBtn);
    })

})