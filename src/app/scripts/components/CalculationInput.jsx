import React, { useState, useCallback, useContext } from 'react'
import GeotabContext from '../contexts/Geotab';

import {
    TextInput
} from '@geotab/zenith'

const CalculationInput = ({ costDescription, savingsDescription }) => {
    const [context, setContext] = useContext(GeotabContext);
    const [cost, setCost] = useState(context.cost || 0.00);
    const [savings, setSavings] = useState(context.savings || 0.00)

    const handleCostChange = ((e) => {
        const costValue = e.target.value
        setCost(costValue)

        setContext({ ...context, cost: costValue })
    });

    const handleSavingsChange = ((e) => {
        const savingsValue = e.target.value
        setSavings(savingsValue)

        setContext({ ...context, savings: savingsValue })
    });
    return (
        <div className='roi-calculation-container'>
            <div className='roi-calculation-input'>
                <TextInput value={cost} onChange={handleCostChange} assistive={costDescription} type='number' placeholder='0.79' />
            </div>
            <div className='roi-calculation-input'>
                <TextInput value={savings} onChange={handleSavingsChange} assistive={savingsDescription} type='number' placeholder='20%' />
            </div>
        </div>
    )
}

export default CalculationInput