import React, { useState, useEffect, useContext, useMemo } from 'react';
import GeotabContext from '../contexts/Geotab';

import {
    ButtonType,
    IconLink2,
    IconLocationMap,
    IconPackage2,
    Header,
    Menu,
    Table,
    Layout,
    DateRange,
    FiltersBar,
    GET_TODAY_OPTION
} from '@geotab/zenith'

const Main = () => {
    const [context] = useContext(GeotabContext);
    const [devices, setDevices] = useState([]);
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

    const columns = useMemo(() => [{
        id: "col1",
        title: "Name",
        meta: {
            defaultWidth: 200
        }
    }, {
        id: "col2",
        title: "Serial Number",
        meta: {
            defaultWidth: 200
        }
    }, {
        id: "col3",
        title: "License Plate",
        meta: {
            defaultWidth: 200
        }
    }, {
        id: "col4",
        title: "Asset Type",
        meta: {
            defaultWidth: 200
        }
    }], []);
    const entities = useMemo(() => devices.map((device, index) => {
        console.log('Device info', device);

        return {
            id: index.toString(),
            col1: device.name,
            col2: device.serialNumber ? device.serialNumber : "############",
            col3: device.licensePlate ? device.licensePlate : "############",
            col4: device.deviceType
        }
    }), [devices]);

    return (
        <Layout>
            <Header onFiltersBarOpen={() => setIsAllFiltersVisible(true)}>
                <Header.Title pageName='ROI Calculator' />
                <FiltersBar isAllFiltersVisible={isAllFiltersVisible} toggleAllFilters={setIsAllFiltersVisible} getDefaultFiltersState={getDefaultFiltersState} onClearAllFilters={onClearAllFilters}>
                    <FiltersBar.PeriodPicker id="dateRange" showInSidePanel sidePanelTitle="Date range" state={dateRangeValue} defaultState={dateRangeDefaultValue} onChange={(value) => setDateRangeValue(value)} props={{
                        options: ["Today", "LastWeek", "LastMonth", "LastThreeMonths", "ThisQuarter", "Custom"],
                        timeSelect: true
                    }} />
                </FiltersBar>
            </Header>
            <div style={{ height: "500px" }}>
                <Table description="Fleet Assets" columns={columns} entities={entities}></Table>
            </div>
        </Layout >
    );
};

export default Main;
