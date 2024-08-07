import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import ExchangeRatesDisplay from "../components/ExchangeRateDisplay";
import React from "react";

describe("ExchangeRatesDisplay", () => {
  const mockProps = {
    rates: {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.21,
      CAD: 1.25,
      AUD: 1.34,
      CHF: 0.92,
      CNY: 6.47,
      KRW: 1130.65,
    },
    amount: 100,
    currencies: [
      { code: "EUR", name: "Euro", image: "eur.png" },
      { code: "GBP", name: "British Pound", image: "gbp.png" },
      { code: "JPY", name: "Japanese Yen", image: "jpy.png" },
      { code: "CAD", name: "Canadian Dollar", image: "cad.png" },
      { code: "AUD", name: "Australian Dollar", image: "aud.png" },
      { code: "CHF", name: "Swiss Franc", image: "chf.png" },
      { code: "CNY", name: "Chinese Yuan", image: "cny.png" },
      { code: "KRW", name: "South Korean Won", image: "krw.png" },
    ],
    baseCurrency: "USD",
  };

  it("renders without crashing", () => {
    render(<ExchangeRatesDisplay {...mockProps} />);
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });

  it("displays up to 7 currency rates", () => {
    render(<ExchangeRatesDisplay {...mockProps} />);
    const currencyItems = screen.getAllByRole("img");
    expect(currencyItems).toHaveLength(7);
  });

  it("sorts currencies alphabetically", () => {
    render(<ExchangeRatesDisplay {...mockProps} />);
    const currencyCodes = screen
      .getAllByText(/[A-Z]{3}/)
      .map((el) => el.textContent);
    expect(currencyCodes).toEqual([
      "AUD",
      "CAD",
      "CHF",
      "CNY",
      "EUR",
      "GBP",
      "JPY",
    ]);
  });

  it("excludes the base currency", () => {
    render(<ExchangeRatesDisplay {...mockProps} />);
    expect(screen.queryByText("USD")).not.toBeInTheDocument();
  });

  it("displays correct converted amounts", () => {
    render(<ExchangeRatesDisplay {...mockProps} />);
    expect(screen.getByText("117.647059")).toBeInTheDocument(); // 100 / 0.85 for EUR
    expect(screen.getByText("136.986301")).toBeInTheDocument(); // 100 / 0.73 for GBP
  });

  it("displays currency images", () => {
    render(<ExchangeRatesDisplay {...mockProps} />);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "aud.png");
    expect(images[1]).toHaveAttribute("src", "cad.png");
  });

  it("handles no rates scenario", () => {
    const propsWithNoRates = {
      ...mockProps,
      rates: {},
    };
    render(<ExchangeRatesDisplay {...propsWithNoRates} />);
    expect(screen.getByText("No rates available")).toBeInTheDocument();
  });

  it("handles missing currencies", () => {
    const propsWithMissingCurrency = {
      ...mockProps,
      currencies: mockProps.currencies.filter((c) => c.code !== "EUR"),
    };
    render(<ExchangeRatesDisplay {...propsWithMissingCurrency} />);
    expect(screen.queryByText("EUR")).not.toBeInTheDocument();
  });
});
