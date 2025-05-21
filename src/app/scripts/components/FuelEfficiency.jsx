import React, { useState, useContext, useEffect } from 'react'
import GeotabContext from '../contexts/Geotab';
import { roundNumber } from '../utils/math'


import {
    SummaryTileBar,
    SummaryTile,
    IconDispatchAsset,
    IconDollar,
    IconFuelGas,
    IconBadge
} from '@geotab/zenith'

import { Overview } from '@geotab/zenith/dist/overview/overview'

const RESULTS_LIMIT = 50000

const FuelEfficiency = ({ dateRange }) => {
    const [context, setContext] = useContext(GeotabContext);
    const { geotabApi, logger, cost: fuelPrice, savings } = context;

    const [distance, setDistance] = useState(0.00)
    const [totalFuelUsed, setTotalFuelUsed] = useState(0.00)
    const [totalFuelCost, setTotalFuelCost] = useState(0.00)
    const [totalNewFuelCost, setTotalNewFuelCost] = useState(0.00)

    console.log('Current context', context);

    const tripsApiCall = (fromDate, toDate) => {
        geotabApi.call('Get', {
            typeName: 'Trip',
            search: { fromDate, toDate },
            resultsLimit: RESULTS_LIMIT
        }, tripsResult => {
            console.log(`Trips Result:`, tripsResult);
            const totalDistance = tripsResult.reduce((sum, trip) => sum + (trip.distance || 0), 0);
            setDistance(roundNumber(totalDistance))
        }, tripsError => {
            console.error('Something went wrong while trying to retrieve trips data.', tripsError)
        })
    }

    const fuelUsedApiCall = (fromDate, toDate) => {
        geotabApi.call('Get', {
            typeName: 'FuelUsed',
            search: { fromDate, toDate },
            resultsLimit: RESULTS_LIMIT
        }, fuelUsedResult => {
            console.log(`Fuel Used Result:`, fuelUsedResult);

            const totalFuelUsed = fuelUsedResult.reduce((sum, entry) => sum + (entry.totalFuelUsed || 0), 0);
            console.log(typeof totalFuelUsed)
            console.log(typeof fuelPrice)
            setTotalFuelUsed(roundNumber(totalFuelUsed))
        }, fuelUsedError => console.error('Something went wrong while trying to retrieve fuel used data', fuelUsedError))
    }

    const calculateTotalFuelCost = () => {
        const fuelCost = totalFuelUsed * fuelPrice;
        setTotalFuelCost(fuelCost)
        console.log(`Savings value: ${savings}`);

        const newFuelCost = fuelCost - (fuelCost * (savings / 100))

        setTotalNewFuelCost(newFuelCost)
    }

    useEffect(() => {
        console.log('Triggered use effect geotab api calls');
        const { from, to } = dateRange
        const fromDate = new Date(from).toISOString()
        const toDate = new Date(to).toISOString()
        if (fromDate == null || toDate == null) return

        tripsApiCall(fromDate, toDate)
        fuelUsedApiCall(fromDate, toDate)
    }, [dateRange])

    useEffect(calculateTotalFuelCost, [fuelPrice, totalFuelUsed, savings])

    return (
        <SummaryTileBar>
            <SummaryTile title="Distance Traveled" size='medium'>
                <Overview
                    description="Miles"
                    icon={<IconDispatchAsset className="zen-summary-tile-test" size="huger" />}
                    title={distance.toFixed(2)}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Used" size='medium'>
                <Overview
                    description="Gallons"
                    icon={<IconFuelGas className="zen-summary-tile-test" size="huger" />}
                    title={totalFuelUsed.toFixed(2)}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Cost" size='medium' tileType="error">
                <Overview
                    description="$"
                    icon={<IconDollar className="zen-summary-tile-test" size="huger" />}
                    title={totalFuelCost.toFixed(2)}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Cost after savings" size='medium' tileType="success">
                <Overview
                    description="$"
                    icon={<IconBadge className="zen-summary-tile-test" size="huger" />}
                    title={totalNewFuelCost.toFixed(2)}
                />
            </SummaryTile>
        </SummaryTileBar>
    )

}

export default FuelEfficiency