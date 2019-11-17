import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    render() {
        let todoLists = this.props.todoLists;
        if(todoLists){
            let tempid = todoLists[0].id;
            let wrong = false;
            for(let i = 1; i < todoLists.length; i++){
                if(tempid === todoLists[i].id){
                    wrong = true;
                }
            }
            if(wrong)
                todoLists.splice(0, Math.floor(todoLists.length/2));
        }
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);