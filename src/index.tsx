import React from 'react';
import ReactDOM from 'react-dom';

// third party
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import App from 'renderer/App';
import { store } from 'renderer/store';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
