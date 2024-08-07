import { useCallback, useEffect, useRef, useState } from 'react'

import upholdService from '../services/upholdService'

interface RateResponse {
    currency: string
    ask: string
}

interface CachedData {
    rates: { [key: string]: number }
    timestamp: number
}

const CACHE_EXPIRATION = 5 * 60 * 1000 // 5 minutes
const SUPPORTED_CURRENCIES = [
    'USD',
    'EUR',
    'AUD',
    'BRL',
    'CAD',
    'BTC',
    'ETH',
    'GBP',
]

const useFetchRates = () => {
    const [rates, setRates] = useState<{ [key: string]: number }>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const cachedRates = useRef<{ [key: string]: CachedData }>({})
    const initialFetchDone = useRef<boolean>(false)

    const fetchRates = useCallback(async (currency: string) => {
        try {
            const response = await upholdService.getTicker(currency)
            const ratesData = response.reduce(
                (acc: { [key: string]: number }, rate: RateResponse) => {
                    acc[rate.currency] = parseFloat(rate.ask)
                    return acc
                },
                {}
            )
            return ratesData
        } catch (error: any) {
            console.error('Error fetching rates:', error)
            if (error.status === 404) {
                console.warn(`Currency ${currency} not found. Skipping.`)
                return {}
            }
            throw new Error('Failed to fetch rates. Please try again later.')
        }
    }, [])

    const getRatesForCurrency = useCallback(
        async (currency: string) => {
            const now = Date.now()
            if (
                cachedRates.current[currency] &&
                now - cachedRates.current[currency].timestamp < CACHE_EXPIRATION
            ) {
                return cachedRates.current[currency].rates
            } else {
                const newRates = await fetchRates(currency)
                cachedRates.current[currency] = {
                    rates: newRates,
                    timestamp: now,
                }
                return newRates
            }
        },
        [fetchRates]
    )

    const refreshRates = useCallback(
        async (currency: string) => {
            setLoading(true)
            setError(null)
            try {
                const newRates = await getRatesForCurrency(currency)
                setRates(newRates)
            } catch (error) {
                setError('Failed to fetch rates. Please try again later.')
            } finally {
                setLoading(false)
            }
        },
        [getRatesForCurrency]
    )

    useEffect(() => {
        const initializeCaches = async () => {
            if (!initialFetchDone.current) {
                setLoading(true)
                try {
                    await Promise.all(
                        SUPPORTED_CURRENCIES.map(getRatesForCurrency)
                    )
                    initialFetchDone.current = true
                } catch (error) {
                    console.error('Error during initial fetch:', error)
                    setError(
                        'Failed to initialize rates. Please refresh the page.'
                    )
                } finally {
                    setLoading(false)
                }
            }
        }

        initializeCaches()
    }, [getRatesForCurrency])

    return { rates, loading, error, refreshRates }
}

export default useFetchRates
