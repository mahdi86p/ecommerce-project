import { it, expect, describe, vi, beforeEach } from "vitest"
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PaymentSummary from "./PaymentSummery.jsx"
// import axios from "axios"
vi.mock("axios")


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

    // test Payment Summary

    it("display dollar amounts", async () => {
        // render
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
})