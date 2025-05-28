import React, { useState, useEffect } from 'react'

import {
    Modal,
    Waiting
} from '@geotab/zenith'

const FUEL_SAVINGS_URL = 'https://marketplace.geotab.com/category/fuel-management/?sortBy=SolutionTierAscending';
const RISK_MANAGEMENT_URL = 'https://marketplace.geotab.com/category/risk-management/?sortBy=SolutionTierAscending'

const FUEL_SAVINGS_TITLE = 'Fuel Savings Recommendations'
const RISK_MANAGEMENT_TITLE = 'Accident Prevention Recommendations'

const MarketplaceRecommendation = ({ showMpRecommendation, toggleShowMpRecommendation, recommendationType }) => {
    const [recommendationUrl, setRecommendationUrl] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    var iframeUrl = FUEL_SAVINGS_URL
    var iframeTitle = FUEL_SAVINGS_TITLE

    if (recommendationType !== "tab1") {
        iframeUrl = RISK_MANAGEMENT_URL
        iframeTitle = RISK_MANAGEMENT_TITLE
    }

    useEffect(() => {
        if (showMpRecommendation) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1300);
        } else {
            setIsLoading(true)
        }
    }, [showMpRecommendation])

    return (
        <Modal isOpen={showMpRecommendation} onClose={() => { toggleShowMpRecommendation() }} title={iframeTitle}>
            <Waiting isLoading={isLoading} />
            {isLoading ? <div style={{display: 'block', width: '500px', height: '600px'}}></div> : <></>}
            <iframe src={iframeUrl} width={500} height={600} hidden={isLoading}></iframe>
        </Modal>
    )
}

export default MarketplaceRecommendation