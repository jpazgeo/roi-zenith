import React, { useState, useContext, useEffect } from 'react'
import GeotabContext from '../contexts/Geotab';


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
    const { geotabApi, logger, cost: fuelPrice } = context;

    const [distance, setDistance] = useState(0.00)
    const [totalFuelUsed, setTotalFuelUsed] = useState(0.00)
    const [totalFuelCost, setTotalFuelCost] = useState(0.00)

    const tripsApiCall = (fromDate, toDate) => {
        geotabApi.call('Get', {
            typeName: 'Trip',
            search: { fromDate, toDate },
            resultsLimit: RESULTS_LIMIT
        }, tripsResult => {
            console.log(`Trips Result:`, tripsResult);
            const totalDistance = tripsResult.reduce((sum, trip) => sum + (trip.distance || 0), 0);
            setDistance(totalDistance.toFixed(2))
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
            setTotalFuelUsed(totalFuelUsed.toFixed(2))
        }, fuelUsedError => console.error('Something went wrong while trying to retrieve fuel used data', fuelUsedError))
    }

    const calculateTotalFuelCost = () => {
        const fuelCost = totalFuelUsed * fuelPrice;
        setTotalFuelCost(fuelCost.toFixed(2))
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

    useEffect(calculateTotalFuelCost, [fuelPrice, totalFuelUsed])

    return (
        <SummaryTileBar>
            <SummaryTile title="Distance Traveled" size='medium'>
                <Overview
                    description="Miles"
                    icon={<IconDispatchAsset className="zen-summary-tile-test" size="huger" />}
                    title={distance}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Used" size='medium'>
                <Overview
                    description="Gallons"
                    icon={<IconFuelGas className="zen-summary-tile-test" size="huger" />}
                    title={totalFuelUsed}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Cost" size='medium' tileType="error">
                <Overview
                    description="UNIT"
                    icon={<IconDollar className="zen-summary-tile-test" size="huger" />}
                    title={totalFuelCost}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Cost after savings" size='medium' tileType="success">
                <Overview
                    description="UNIT"
                    icon={<IconBadge className="zen-summary-tile-test" size="huger" />}
                    title={totalFuelCost}
                />
            </SummaryTile>
        </SummaryTileBar>
    )

}

export default FuelEfficiency