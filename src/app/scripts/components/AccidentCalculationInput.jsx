import React, { useState, useContext } from 'react'
import GeotabContext from '../contexts/Geotab';

import {
    TextInput
} from '@geotab/zenith'

const AccidentCalculationInput = ({ costDescription, savingsDescription }) => {
    const [context, setContext] = useContext(GeotabContext);
    const [accidentCost, setAccidentCost] = useState(context.accidentCost || 0.00);
    const [accidentSavings, setAccidentSavings] = useState(context.accidentSavings || 0.00)

    const handleCostChange = ((e) => {
        const costValue = e.target.value
        setAccidentCost(costValue)

        setContext({ ...context, accidentCost: costValue })
    });

    const handleSavingsChange = ((e) => {
        const savingsValue = e.target.value
        setAccidentSavings(savingsValue)

        setContext({ ...context, accidentSavings: savingsValue })
    });
    return (
        <div className='roi-calculation-container'>
            <div className='roi-calculation-input'>
                <TextInput value={accidentCost} onChange={handleCostChange} assistive={costDescription} type='number' placeholder='0.79' />
            </div>
            <div className='roi-calculation-input'>
                <TextInput value={accidentSavings} onChange={handleSavingsChange} assistive={savingsDescription} type='number' placeholder='20%' />
            </div>
        </div>
    )
}

export default AccidentCalculationInput