import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import configureStore from '../../configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import AdminApp from './admin.js'

let div = document.createElement('div');
div.setAttribute('id', 'admin');
document.body.appendChild(div);

const mountNode = document.getElementById('admin');
const { persistor, store } = configureStore();

render(
    <AppContainer>
        <Provider store={store}>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
               <AdminApp/>
           {/*</PersistGate>*/}
        </Provider>
    </AppContainer>
    ,
    mountNode
);

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}
