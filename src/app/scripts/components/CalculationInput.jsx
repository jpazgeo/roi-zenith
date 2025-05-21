import React, { useState, useCallback, useContext } from 'react'
import GeotabContext from '../contexts/Geotab';

import {
    TextInput
} from '@geotab/zenith'

const CalculationInput = ({ description }) => {
    const [cost, setCost] = useState(0);
    const [context, setContext] = useContext(GeotabContext);

    const handleChange = useCallback((e) => {
        const costValue = e.target.value
        setCost(costValue)
        setContext({...context, cost: costValue})
    }, []);
    return (
        <div className='roi-calculation-input'>
            <TextInput value={cost} onChange={handleChange} assistive={description} type='number' />
        </div>
    )
}

export default CalculationInput