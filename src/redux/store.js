// store.js
import rootReducer from "./rootReducer"
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import EmployeeSaga from "./employeeSaga";



const sagaMiddleware = createSagaMiddleware();

const store = configureStore({reducer:rootReducer,middleware:[sagaMiddleware]});

sagaMiddleware.run(EmployeeSaga);

export default store;
    