import React, { useState, useEffect, useContext } from 'react'
import GeotabContext from '../contexts/Geotab';
import AccidentCalculationInput from './AccidentCalculationInput.jsx'

import { roundNumber } from '../utils/math'

import {
    SummaryTileBar,
    SummaryTile,
    IconWarning,
    IconDollar,
    IconFuelGas,
    IconBadge
} from '@geotab/zenith'

import { Overview } from '@geotab/zenith/dist/overview/overview'

const ACCELERATION_FORWARD_BREAKING_THRESHOLD = 6;

const AccidentPrevention = ({ dateRange }) => {
    const [context] = useContext(GeotabContext);
    const { geotabApi, accidentCost, accidentSavings } = context;
    const [totalAccidentCost, setTotalAccidentCost] = useState(0.0)
    const [accidentCount, setAccidentCount] = useState(0)
    const [totalNewAccidentsCost, setTotalNewAccidentsCost] = useState(0.00)

    const accidentsApiCall = (fromDate, toDate) => {
        geotabApi.call("Get", {
            typeName: "StatusData",
            search: {
                fromDate,
                toDate,
                diagnosticSearch: {
                    id: "DiagnosticAccelerationForwardBrakingId"
                }
            }
        }, result => {
            const highImpactEvents = result.filter(statusDataEntry => +statusDataEntry.data >= ACCELERATION_FORWARD_BREAKING_THRESHOLD).length;

            setAccidentCount(highImpactEvents)
        }, e => {
            console.error("Braking API error:", e);
        });
    }

    const calculateTotalAccidentsCost = () => {
        const accidentsCost = roundNumber(accidentCount * accidentCost);
        setTotalAccidentCost(accidentsCost)

        const newAccidentsCost = roundNumber(accidentsCost - (accidentsCost * (accidentSavings / 100)))

        setTotalNewAccidentsCost(newAccidentsCost)
    }

    useEffect(() => {
        console.log('Triggered accident prevention use effect geotab api calls');
        const { from, to } = dateRange
        const fromDate = new Date(from).toISOString()
        const toDate = new Date(to).toISOString()
        if (fromDate == null || toDate == null) return

        accidentsApiCall(fromDate, toDate)
    }, [dateRange])

    useEffect(calculateTotalAccidentsCost, [accidentCost, accidentCount, accidentSavings])

    return (
        <>
            <AccidentCalculationInput costDescription={"Average cost per accident"} savingsDescription={"Savings percentage"} />
            <SummaryTileBar>
                <SummaryTile title="Total Accident Cost" size='medium' tileType="error">
                    <Overview
                        description="$"
                        icon={<IconDollar className="zen-summary-tile-test" size="huger" />}
                        title={totalAccidentCost}
                    />
                </SummaryTile>
                <SummaryTile title="Total Accident Cost after savings" size='medium' tileType="success">
                    <Overview
                        description="$"
                        icon={<IconBadge className="zen-summary-tile-test" size="huger" />}
                        title={totalNewAccidentsCost}
                    />
                </SummaryTile>
                <SummaryTile title="Accidents Count" size='medium'>
                    <Overview
                        icon={<IconWarning className="zen-summary-tile-test" size="huger" />}
                        title={accidentCount}
                    />
                </SummaryTile>
                {/* <SummaryTile title="TBD" size='medium'>
                    <Overview
                        description="Gallons"
                        icon={<IconFuelGas className="zen-summary-tile-test" size="huger" />}
                        title={"TBD"}
                    />
                </SummaryTile> */}
            </SummaryTileBar>
        </>
    )

}

export default AccidentPrevention