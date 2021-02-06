import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Navbar, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}
class ItemsList extends React.Component {
    
    fixKey = (list) => {
        for(let i = 0; i < list.length; i++){
          list[i].key = i;
        }
    }

    /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
    sortTasks = (sortingCriteria) => {
        let todoList = this.props.todoList;
        todoList.currentItemSortCriteria = sortingCriteria;
        todoList.items.sort(this.compare);
        this.fixKey(todoList.items);
        getFirestore().collection('todoLists').doc(todoList.id).update({
            items: todoList.items
        })
    }

    /**
     * This method tests to see if the current sorting criteria is the same as the argument.
     * 
     * @param {ItemSortCriteria} testCriteria Criteria to test for.
     */
    isCurrentItemSortCriteria = (testCriteria) => {
        let todoList = this.props.todoList;
        return todoList.currentItemSortCriteria === testCriteria;
    }

    /**
     * This method compares two items for the purpose of sorting according to what
     * is currently set as the current sorting criteria.
     * 
     * @param {TodoListItem} item1 First item to compare.
     * @param {TodoListItem} item2 Second item to compare.
    */
    compare = (item1, item2) => {

        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        //sort by due dates
        else if(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)){
            if(item1.due_date == null && item2.due_date != null){
                return -1;
            }
            else if(item2.due_date == null && item1.due_date != null){
                return 1;
            }
            else if(item1.due_date == null && item2.due_date == null){
                return 0;
            }
            else if(item1.due_date < item2.due_date)
                return -1
            else if(item1.due_date > item2.due_date)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
    }

    sortByTask = () =>{
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    sortByDuedate = () => {
        if(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)){
            this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        else{
            this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    sortByStatus = () => {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        return (
            <div className="todo-lists section">
                <Navbar className="light-green lighten-3">
                    <div>
                        <div className="black-text text-darken-2" onClick={this.sortByTask} style={{position: "absolute", left: "2%", fontSize:'24pt', fontWeight:'bold', cursor:'pointer'}}>Task</div>
                        <div className="black-text text-darken-2" onClick={this.sortByDuedate} style={{position: "absolute", left: "35%",fontSize:'24pt', fontWeight:'bold', cursor:'pointer'}}>Due Date</div>
                        <div className="black-text text-darken-2" onClick={this.sortByStatus} style={{position: "absolute", left: "60%", fontSize:'24pt', fontWeight:'bold', cursor:'pointer'}}>Status</div>
                    </div>
                </Navbar>
                {items && items.map(function(item) {
                    //item.id = item.key;
                    return (
                        <Link to={'/todoList/'+todoList.id+'/'+item.key} key={item.key}>
                            <ItemCard todoList={todoList} item={item}/>
                        </Link>
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
        { collection: 'todoLists' ,orderBy: ['visited','desc']},
    ]),
)(ItemsList);