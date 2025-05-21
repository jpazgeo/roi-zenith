import React, { useState, useContext, useEffect } from 'react'
import GeotabContext from '../contexts/Geotab';


import {
    SummaryTileBar,
    SummaryTile,
    IconDispatchAsset,
    IconDollar
} from '@geotab/zenith'

import { Overview } from '@geotab/zenith/dist/overview/overview'

const FuelEfficiency = ({ dateRange }) => {
    const [context, setContext] = useContext(GeotabContext);
    const { geotabApi, logger, cost: fuelPrice } = context;

    const [distance, setDistance] = useState(0.00)
    const [totalFuelCost, setTotalFuelCost] = useState(0.00)

    const tripsApiCall = (fromDate, toDate) => {
        geotabApi.call('Get', {
            typeName: 'Trip',
            search: { fromDate, toDate },
            resultsLimit: 1000
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
            resultsLimit: 1000
        }, fuelUsedResult => {
            console.log(`Fuel Used Result:`, fuelUsedResult);

            const totalFuelUsed = fuelUsedResult.reduce((sum, entry) => sum + (entry.totalFuelUsed || 0), 0);
            console.log(typeof totalFuelUsed)
            console.log(typeof fuelPrice)
            const fuelCost = totalFuelUsed.toFixed(2) * fuelPrice;
            setTotalFuelCost(fuelCost)
        }, fuelUsedError => console.error('Something went wrong while trying to retrieve fuel used data', fuelUsedError))
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

    // api.call("Get", {
    //     typeName: "Trip",
    //     search: { fromDate, toDate },
    //     resultsLimit: 1000
    // }, tripResult => {
    //     const totalDistance = tripResult.reduce((sum, trip) => sum + (trip.distance || 0), 0);

    //     api.call("Get", {
    //         typeName: "FuelUsed",
    //         search: { fromDate, toDate },
    //         resultsLimit: 1000
    //     }, fuelResult => {
    //         const totalFuelUsed = fuelResult.reduce((sum, entry) => sum + (entry.totalFuelUsed || 0), 0);
    //         const fuelCost = totalFuelUsed * fuelPrice;
    //         const fuelSavings = fuelCost * (markupPercent / 100);

    //         resolve({ fuelCost, fuelSavings, markupPercent });
    //     }, fuelErr => {
    //         console.error("FuelUsed API error:", fuelErr);
    //         reject("Failed to fetch FuelUsed data.");
    //     });
    // }, tripErr => {
    //     console.error("Trip API error:", tripErr);
    //     reject("Failed to fetch Trip data.");
    // });

    return (
        <SummaryTileBar>
            <SummaryTile title="Distance Traveled" size='medium'>
                <Overview
                    description="Miles"
                    icon={<IconDispatchAsset className="zen-summary-tile-test" size="huger" />}
                    title={distance}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Cost" size='medium'>
                <Overview
                    description="UNIT"
                    icon={<IconDollar className="zen-summary-tile-test" size="huger" />}
                    title={totalFuelCost}
                />
            </SummaryTile>
        </SummaryTileBar>
    )

}

export default FuelEfficiency