import React, { useState, useEffect, useContext, useMemo } from 'react';
import GeotabContext from '../contexts/Geotab';
import CalculationInput from './CalculationInput.jsx'
import FuelEficiency from './FuelEfficiency.jsx'

import {
    Header,
    Table,
    Layout,
    FiltersBar,
    GET_TODAY_OPTION,
    Banner,
    SummaryTileBar,
    SummaryTile
} from '@geotab/zenith'

const Main = () => {
    const [context] = useContext(GeotabContext);
    const [devices, setDevices] = useState([]);
    const [isBannerVisible, setIsBannerVisible] = useState(true)
    const [isAllFiltersVisible, setIsAllFiltersVisible] = useState(false);

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

    const { geotabApi, logger } = context;

    useEffect(() => {
        geotabApi.call('Get', {
            typeName: 'Device',
        }, (result) => {
            logger.log(`Loaded ${result.length} devices`);
            logger.log(result);
            setDevices(result);
        }, (error) => {
            logger.error(error);
        });
    }, []);

    return (
        <Layout>
            <Header onFiltersBarOpen={() => setIsAllFiltersVisible(true)}>
                <Header.Title pageName='ROI Calculator' />
                <FiltersBar className='roi-filters-bar' isAllFiltersVisible={isAllFiltersVisible} toggleAllFilters={setIsAllFiltersVisible} getDefaultFiltersState={getDefaultFiltersState} onClearAllFilters={onClearAllFilters}>
                    <FiltersBar.PeriodPicker id="dateRange" showInSidePanel sidePanelTitle="Date range" state={dateRangeValue} defaultState={dateRangeDefaultValue} onChange={(value) => setDateRangeValue(value)} props={{
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
                <CalculationInput description={"Average fuel cost per gallon"} />
                <FuelEficiency />
            </div>
        </Layout >
    );
};

export default Main;
