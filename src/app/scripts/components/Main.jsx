import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import GeotabContext from '../contexts/Geotab';
import CalculationInput from './CalculationInput.jsx'
import FuelEficiency from './FuelEfficiency.jsx'
import MarketplaceRecommendation from './MarketplaceRecommendation.jsx'

import {
    Header,
    Layout,
    FiltersBar,
    GET_TODAY_OPTION,
    Banner,
    IconMarketplace,
    ButtonType
} from '@geotab/zenith'

const Main = () => {
    const [context] = useContext(GeotabContext);
    const [isBannerVisible, setIsBannerVisible] = useState(true)
    const [isAllFiltersVisible, setIsAllFiltersVisible] = useState(false);
    const [showMpRecommendation, setShowMpRecommendation] = useState(false);

    const today = useMemo(() => GET_TODAY_OPTION(), []);
    const dateRangeDefaultValue = useMemo(() => ({
        label: today.label,
        ...today.getRange()
    }), [today]);
    const [dateRangeValue, setDateRangeValue] = useState(dateRangeDefaultValue);

    const onClearAllFilters = () => {
        setDateRangeValue(dateRangeDefaultValue);
    };
    const getDefaultFiltersState = () => ({
        "dateRange": {
            state: dateRangeDefaultValue
        }
    });

    const handleDateRangeChange = useCallback((newValue) => {
        console.log("newValue", newValue);
        setDateRangeValue(newValue);
    }, []);

    const toggleShowMpRecommendation = () => {
        console.log(`Current show MP recommendation value: ${showMpRecommendation}`);
        
        setShowMpRecommendation(!showMpRecommendation)
        console.log(`New show MP recommendation value: ${showMpRecommendation}`);
    }

    const { geotabApi, logger } = context;

    return (
        <>
            <Layout>
                <Header onFiltersBarOpen={() => setIsAllFiltersVisible(true)}>
                    <Header.Title pageName='ROI Calculator' />
                    <Header.Button onClick={toggleShowMpRecommendation} id="4" important={true} type={ButtonType.Secondary} icon={IconMarketplace}>Marketplace Recommendations</Header.Button>
                    <FiltersBar className='roi-filters-bar' isAllFiltersVisible={isAllFiltersVisible} toggleAllFilters={setIsAllFiltersVisible} getDefaultFiltersState={getDefaultFiltersState} onClearAllFilters={onClearAllFilters}>
                        <FiltersBar.PeriodPicker id="dateRange" showInSidePanel sidePanelTitle="Date range" state={dateRangeValue} defaultState={dateRangeDefaultValue} onChange={handleDateRangeChange} props={{
                            options: ["Today", "LastWeek", "LastMonth", "LastThreeMonths", "ThisQuarter", "Custom"],
                            timeSelect: true
                        }} />
                    </FiltersBar>
                </Header>

                <div>
                    {isBannerVisible ? <div className="roi-banner-content">
                        <Banner type="warning" header="Disclaimer" icon onClose={() => setIsBannerVisible(false)} size='S'>
                            These are estimations. External factors may affect the results.
                        </Banner>
                    </div> : <></>}
                    <CalculationInput costDescription={"Average fuel cost per gallon"} savingsDescription={"Savings percentage"} />
                    <FuelEficiency dateRange={dateRangeValue} />
                </div>
                <div className='roi-summary-container'><MarketplaceRecommendation showMpRecommendation={showMpRecommendation} toggleShowMpRecommendation={toggleShowMpRecommendation} /></div>
            </Layout >
        </>
    );
};

export default Main;
