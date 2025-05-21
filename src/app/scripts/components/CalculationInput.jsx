import React, { useState, useCallback, useContext } from 'react'
import GeotabContext from '../contexts/Geotab';

import {
    TextInput
} from '@geotab/zenith'

const CalculationInput = ({ costDescription, savingsDescription}) => {
    const [cost, setCost] = useState(0);
    const [savings, setSavings] = useState(0.0)
    const [context, setContext] = useContext(GeotabContext);

    const handleCostChange = useCallback((e) => {
        const costValue = e.target.value
        setCost(costValue)
        setContext({ ...context, cost: costValue })
    }, []);

    const handleSavingsChange = useCallback((e) => {
        const costValue = e.target.value
        setCost(costValue)
        setContext({ ...context, cost: costValue })
    }, []);
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