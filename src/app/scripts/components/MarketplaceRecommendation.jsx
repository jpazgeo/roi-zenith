import React, { useState, useMemo } from 'react'

import {
    Modal
} from '@geotab/zenith'

const FUEL_SAVINGS_URL = 'https://marketplace.geotab.com/category/fuel-management/?sortBy=SolutionTierAscending';
const RISK_MANAGEMENT_URL = 'https://marketplace.geotab.com/category/risk-management/?sortBy=SolutionTierAscending'

const FUEL_SAVINGS_TITLE = 'Fuel Savings Recommendations'
const RISK_MANAGEMENT_TITLE = 'Accident Prevention Recommendations'

const MarketplaceRecommendation = ({ showMpRecommendation, toggleShowMpRecommendation, recommendationType }) => {
    const [recommendationUrl, setRecommendationUrl] = useState(0)
    var iframeUrl = FUEL_SAVINGS_URL
    var iframeTile = FUEL_SAVINGS_TITLE
    
    if (recommendationType === 1) {
        iframeUrl = RISK_MANAGEMENT_URL
        iframeTile = RISK_MANAGEMENT_TITLE
    }

    return (
        <Modal isOpen={showMpRecommendation} onClose={() => {toggleShowMpRecommendation()}} title="Fuel Saving Recommendations">
            <iframe src={iframeUrl} width={500} height={600}></iframe>
        </Modal>
    )
}

export default MarketplaceRecommendation