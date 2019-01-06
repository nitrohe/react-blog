import {createStore,applyMiddleware,compose} from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import reconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const win = window;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

const config = {
    key: 'root',
    storage,
    blacklist: [],
    stateReconciler: reconciler, //合并模式
    debug: false
}

let storeEnhancers ;
if(process.env.NODE_ENV==='production'){
    storeEnhancers = compose(
        applyMiddleware(...middlewares,sagaMiddleware)
    );
}else{
    storeEnhancers = compose(
        applyMiddleware(...middlewares,sagaMiddleware),
        (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
    );
}

export default function configureStore(initialState={}) {
    const newReducers = persistReducer(config, rootReducer)
    //const store = createStore(newReducers, initialState,storeEnhancers);
    const store = createStore(rootReducer, initialState,storeEnhancers);
    sagaMiddleware.run(rootSaga);
    if (module.hot && process.env.NODE_ENV!=='production') {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept( './reducers',() => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    let persistor = persistStore(store);
    return { persistor, store };
}
