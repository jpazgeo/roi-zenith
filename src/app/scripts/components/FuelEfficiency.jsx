import React, { useState, useContext, useEffect } from 'react'
import GeotabContext from '../contexts/Geotab';


import {
    SummaryTileBar,
    SummaryTile,
    IconDispatchAsset,
    IconDollar
} from '@geotab/zenith'

import {Overview} from '@geotab/zenith/dist/overview/overview'

const FuelEfficiency = ({ startDate, endDate }) => {
    const [context] = useContext(GeotabContext);
    const [distance, setDistance] = useState(0.00)
    const [totalFuelCost, setTotalFuelCost] = useState(0.00)

    return (
        <SummaryTileBar>
            <SummaryTile title="Distance Traveled">
                <Overview
                    description="UNIT"
                    icon={<IconDispatchAsset className="zen-summary-tile-test" size="huger" />}
                    title={distance}
                />
            </SummaryTile>
            <SummaryTile title="Total Fuel Cost">
                <Overview
                    description="UNIT"
                    icon={<IconDollar className="zen-summary-tile-test" size="huger" />}
                    title={distance}
                />
            </SummaryTile>
        </SummaryTileBar>
    )

}

export default FuelEfficiency