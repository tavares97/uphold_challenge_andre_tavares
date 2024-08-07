import React, { useCallback, useState } from 'react'

import { debounce } from 'lodash'

interface AmountInputProps {
    initialAmount: string
    onAmountChange: (value: string) => void
}

const AmountInput: React.FC<AmountInputProps> = React.memo(
    ({ initialAmount, onAmountChange }) => {
        const [amount, setAmount] = useState(initialAmount)

        const debouncedHandleAmountChange = debounce((value: string) => {
            onAmountChange(value)
        }, 300)

        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value
                if (/^\d*\.?\d*$/.test(newValue)) {
                    setAmount(newValue)
                    debouncedHandleAmountChange(newValue)
                }
            },
            [debouncedHandleAmountChange]
        )

        return (
            <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={handleChange}
                className="
                flex-grow text-4xl bg-transparent border-none focus:outline-none 
              placeholder-slate-400 px-3 py-2 rounded-lg bg-blue-50
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
            "
                placeholder="0.00"
                step="0.01"
                min="0"
            />
        )
    }
)

export default AmountInput
