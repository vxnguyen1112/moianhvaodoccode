import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from 'App';
import { registerLicense } from '@syncfusion/ej2-base';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store';

// Registering Syncfusion license key
registerLicense(process.env.REACT_APP_LICENSE_KEY);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
