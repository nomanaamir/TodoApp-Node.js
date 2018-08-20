
import {ActionTypes} from '../Actions/todo_actions.js';

const InitialState = {
    todo_submited:"",
    todos:[],
    todo_deleted:""
}
// console.log(InitialState.todos)
export default (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.TODO_SUCCESS:
        console.log(action)
            return ({...state, todo_submited: action.payload});    
                case ActionTypes.TODO_DATA:
                console.log('payloadddddd',action.payload)
                return({
                    ...state,
                    todos: action.payload
                })
            case ActionTypes.TODO_DELETE:
            // alert(action.payload)
            return({
                ...state,
                todo_deleted: action.payload
            })
            case ActionTypes.TODO_EDIT:
            console.log(' EDITEDDDD' ,action.payload)
            return({
                ...state,
                todo_edit: action.payload
            })
        default:
            return state;
    }
}
