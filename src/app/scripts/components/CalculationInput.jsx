import React, { useState, useCallback } from 'react'
import {
    TextInput
} from '@geotab/zenith'

const CalculationInput = ({ description }) => {
    const [cost, setCost] = useState(0);

    const handleChange = useCallback((e) => {
        setCost(e.target.value);
    }, []);
    return (
        <div className='roi-calculation-input'>
            <TextInput value={cost} onChange={handleChange} assistive={description} type='number' />
        </div>
    )
}

export default CalculationInput