import { createStore, combineReducers } from 'redux';
import TodoReducer from '../modules/todo';

const rootReducer = combineReducers({ TodoReducer });

const store = createStore(rootReducer);

export default store;
