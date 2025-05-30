import React, { useState, useContext, useMemo, useCallback } from 'react';
import FuelEficiency from './FuelEfficiency.jsx'
import AccidentPrevention from './AccidentPrevention.jsx'
import MarketplaceRecommendation from './MarketplaceRecommendation.jsx'

import {
    Header,
    Layout,
    FiltersBar,
    GET_TODAY_OPTION,
    Banner,
    IconMarketplace,
    ButtonType,
    Tabs
} from '@geotab/zenith'

const Main = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(true)
    const [isAllFiltersVisible, setIsAllFiltersVisible] = useState(false);
    const [showMpRecommendation, setShowMpRecommendation] = useState(false);
    const [activeTabId, setactiveTabId] = useState('tab1');

    const tabs = useMemo(() => [{
        id: "tab1",
        name: "Fuel Efficiency"
    }, {
        id: "tab2",
        name: "Accident Prevention"
    }], []);

    const onTabChange = useCallback((newVal) => {
        setactiveTabId(newVal);
    }, []);

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

    return (
        <>
            <Layout>
                <Header onFiltersBarOpen={() => setIsAllFiltersVisible(true)}>
                    <Header.Title pageName='ROI Estimator' isBeta/>
                    <Header.Button onClick={toggleShowMpRecommendation} id="4" important={true} type={ButtonType.Secondary} icon={IconMarketplace}>Marketplace Recommendations</Header.Button>
                    <FiltersBar className='roi-filters-bar' isAllFiltersVisible={isAllFiltersVisible} toggleAllFilters={setIsAllFiltersVisible} getDefaultFiltersState={getDefaultFiltersState} onClearAllFilters={onClearAllFilters}>
                        <FiltersBar.PeriodPicker id="dateRange" showInSidePanel sidePanelTitle="Date range" state={dateRangeValue} defaultState={dateRangeDefaultValue} onChange={handleDateRangeChange} props={{
                            options: ["Today", "LastWeek", "LastMonth", "LastThreeMonths", "ThisQuarter", "Custom"],
                            timeSelect: true
                        }} />
                    </FiltersBar>
                    <Tabs key="headerTabs" tabs={tabs} activeTabId={activeTabId} onTabChange={onTabChange} />
                </Header>

                <div>
                    {isBannerVisible ? <div className="roi-banner-content">
                        <Banner type="warning" header="Disclaimer" icon onClose={() => setIsBannerVisible(false)} size='S'>
                            These are estimations. External factors may affect the results.
                        </Banner>
                    </div> : <></>}
                    {activeTabId === "tab1" ? <FuelEficiency dateRange={dateRangeValue} /> : <AccidentPrevention dateRange={dateRangeValue} />}

                </div>
                <div className='roi-summary-container'><MarketplaceRecommendation showMpRecommendation={showMpRecommendation} toggleShowMpRecommendation={toggleShowMpRecommendation} recommendationType={activeTabId} /></div>
            </Layout >
        </>
    );
};

export default Main;
