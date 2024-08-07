import React, { useCallback, useMemo, useState } from 'react'

import AmountInput from './components/InputAmount'
import CurrencySelector from './components/CurrencySelector'
import ExchangeRatesDisplay from './components/ExchangeRateDisplay'
import LoadingIndicator from './components/Loading'
import useFetchCurrencies from './hooks/useFetchCurrencies'
import useFetchRates from './hooks/useFetchRates'

const App: React.FC = () => {
    const [amount, setAmount] = useState<string>('')
    const [currency, setCurrency] = useState<string>('USD')
    const {
        rates,
        loading: ratesLoading,
        error,
        refreshRates,
    } = useFetchRates()
    const { currencies, loading: currenciesLoading } = useFetchCurrencies()

    const parsedAmount = useMemo(() => parseFloat(amount) || 0, [amount])

    const handleAmountChange = useCallback((value: string) => {
        setAmount(value)
    }, [])

    const handleCurrencyChange = useCallback(
        (newCurrency: string) => {
            setCurrency(newCurrency)
            refreshRates(newCurrency)
        },
        [refreshRates]
    )

    const isLoading = currenciesLoading || ratesLoading

    return (
        <div className="max-w-md mx-auto p-4 h-full">
            <h1 className="text-4xl font-bold text-center mb-5">
                Currency Converter
            </h1>
            <p className="text-center text-gray-400 mb-8 font-semibold">
                Receive competitive and transparent pricing with no hidden
                spreads. See how we compare.
            </p>

            <div className="flex items-center mb-4 relative">
                <AmountInput
                    initialAmount={amount}
                    onAmountChange={handleAmountChange}
                />
                <CurrencySelector
                    currency={currency}
                    onCurrencyChange={handleCurrencyChange}
                    currencies={currencies}
                />
            </div>

            {amount.trim() === '' ? (
                <p className="text-gray-400 text-center text-sm">
                    Enter an amount to check the rates.
                </p>
            ) : error ? (
                <p className="text-red-500 text-center text-sm">{error}</p>
            ) : (
                !isLoading && (
                    <ExchangeRatesDisplay
                        rates={rates}
                        amount={parsedAmount}
                        currencies={currencies}
                        baseCurrency={currency}
                    />
                )
            )}

            {isLoading && <LoadingIndicator />}
        </div>
    )
}

export default React.memo(App)
