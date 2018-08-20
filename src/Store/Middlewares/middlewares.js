import {ActionTypes} from '../Actions/todo_actions';

export function todo(writeTodo) {
    return dispatch => {
        fetch('http://localhost:3000/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ todos: writeTodo })
        }).then(
            dispatch({ type: ActionTypes.TODO_SUCCESS, payload: 'Successfully Submited' })
            )

    }
}

export function data(){
    return dispatch =>{
        fetch('http://localhost:3000/users',{
            method: 'GET',
        }).then(res=>{
            console.log("responseeeee",res)
            return res.json()
        }).then(todos=>{
            console.log(todos,"abccccccc")

            dispatch({type: ActionTypes.TODO_DATA, payload: todos})
        })
    }
}

export function deletee(key){
    return dispatch =>{
        fetch('http://localhost:3000/users/' + key ,{
            method: 'delete',
            body: JSON.stringify({_id: key})
        }).then(
             dispatch({type: ActionTypes.TODO_DELETE, payload: "Deleted"})
        )
        // alert(key)
    }
}

export function edit(todo,key){
    return dispatch =>{
        fetch('http://localhost:3000/users/' + key,{
            method:'put',
            body: JSON.stringify({todos: todo}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(
            dispatch({type: ActionTypes.TODO_EDIT, payload:"Edit Successfully"})
        )
        // alert(todo)
        // alert(key)
        
    }
}