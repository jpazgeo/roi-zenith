import React, { useState } from 'react';


import DevicesPage from './DevicesPage.jsx';


import GeotabContext from '../contexts/Geotab';
import Logger from '../utils/logger';

import '@geotab/zenith/dist/index.css'


const App = ({ geotabApi, geotabState, appName }) => {
  const logger = Logger(appName);
  const [context, setContext] = useState({ geotabApi, geotabState, logger });

  return (
    <>
      <GeotabContext.Provider value={[context, setContext]}>
        
        
        <DevicesPage />
        
        
      </GeotabContext.Provider>
    </>
  );
};

export default App;
