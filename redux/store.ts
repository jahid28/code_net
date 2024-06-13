import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';
import  combineReducers  from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
// import { reducer1 } from './reducers';


// const makeStore: MakeStore<SagaStore> = () => {
    const sagaMiddleware = createSagaMiddleware();
//     const store: SagaStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//     store.sagaTask = sagaMiddleware.run(rootSaga);
//     return store;
// };


// const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));

const store = configureStore({
    reducer: combineReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

sagaMiddleware.run(mySaga);
export default store;

