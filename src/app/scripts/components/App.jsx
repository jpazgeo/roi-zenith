import React, { useState } from 'react';


import Main from './Main.jsx';


import GeotabContext from '../contexts/Geotab';
import Logger from '../utils/logger';

import '@geotab/zenith/dist/index.css'


const App = ({ geotabApi, geotabState, appName }) => {
  const logger = Logger(appName);
  const [context, setContext] = useState({ geotabApi, geotabState, logger });

  return (
    <>
      <GeotabContext.Provider value={[context, setContext]}>
        <Main />
      </GeotabContext.Provider>
    </>
  );
};

export default App;
