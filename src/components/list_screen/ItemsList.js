import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Navbar, Button } from 'react-materialize';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <Navbar className="light-green lighten-3">
                    <div id="list_items_container">
                        <div className="list_item_task_header black-text text-darken-2" onClick={this.props.sortByTask} style={{position: "absolute", left: "2%"}}><h5>Task</h5></div>
                        <div className="list_item_due_date_header black-text text-darken-2" onClick={this.props.sortByDuedate} style={{position: "absolute", left: "35%"}}><h5>Due Date</h5></div>
                        <div className="list_item_status_header black-text text-darken-2" onClick={this.props.sortByStatus} style={{position: "absolute", left: "65%"}}><h5>Status</h5></div>
                    </div>
                </Navbar>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} key={item.key}/>
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);