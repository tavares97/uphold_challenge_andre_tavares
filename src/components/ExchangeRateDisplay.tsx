import { Currency } from '../services/upholdService'
import React from 'react'

interface ExchangeRatesDisplayProps {
    rates: { [key: string]: number }
    amount: number
    currencies: Currency[]
    baseCurrency: string
}

const ExchangeRatesDisplay: React.FC<ExchangeRatesDisplayProps> = ({
    rates,
    amount,
    currencies,
    baseCurrency,
}) => {
    const sortedRates = Object.entries(rates)
        .filter(
            ([code]) =>
                code !== baseCurrency &&
                currencies.map((currency) => currency.code).includes(code)
        )
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(0, 7)

    if (sortedRates.length === 0) {
        return <div>No rates available</div>
    }

    return (
        <div className="">
            {sortedRates.map(([code, rate]) => {
                const currency = currencies.find((c) => c.code === code)

                const convertedAmount = (amount / rate).toFixed(6)
                return (
                    <div
                        key={code}
                        className="flex justify-between items-center p-2"
                    >
                        <div className="flex items-center">
                            <img
                                src={currency?.image}
                                alt={code}
                                className="w-6 h-6 mr-2"
                            />
                            <span className="text-gray-600">{code}</span>
                        </div>
                        <span className="font-medium">{convertedAmount}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default ExchangeRatesDisplay
