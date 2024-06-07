import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import mySaga from './saga';
import  combineReducers  from '../rootReducer';


// const makeStore: MakeStore<SagaStore> = () => {
    const sagaMiddleware = createSagaMiddleware();
//     const store: SagaStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//     store.sagaTask = sagaMiddleware.run(rootSaga);
//     return store;
// };


const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
export default store;

