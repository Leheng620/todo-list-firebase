import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="blue-grey card-content grey-text text-darken-3">
                    <span className="card-title white-text">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;