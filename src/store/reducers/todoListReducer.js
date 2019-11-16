import { bindActionCreators } from "C:/Users/dell/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux";
import * as actionCreators from '../actions/actionCreators'


const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case actionCreators.CREATE_TODO_LIST:
            return{
                ...state,
                todoLists: [...state.todoLists, action.todoList]
            };
        case 'test':
            return{
                ...state,
                todoLists: action.todoLists
            };
        default:
            return state;
            break;
    }
};

export default todoListReducer;