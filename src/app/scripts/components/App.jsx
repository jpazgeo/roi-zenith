import React, { useState } from 'react';


import Main from './Main.jsx';


import GeotabContext from '../contexts/Geotab';
import Logger from '../utils/logger';

import '@geotab/zenith/dist/index.css'


const App = ({ geotabApi, geotabState, appName }) => {
  const logger = Logger(appName);
  const [context, setContext] = useState({ geotabApi, geotabState, logger, cost: 0.0, savings: 0.0, accidentCost: 0, accidentSavings: 0 });

  return (
    <>
      <GeotabContext.Provider value={[context, setContext]}>
        <Main />
      </GeotabContext.Provider>
    </>
  );
};

export default App;
