import reducer from './todo_reducers';
import {combineReducers} from 'redux';

export default combineReducers({
    root: reducer,  // 1st value reducer ka naam hai
});