import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    moveListToTop = () =>{
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            visited: "true"
        });
        this.props.orderedTodo.map(todoList => {
            if(todoList.id != this.props.todoList.id){
                firestore.collection('todoLists').doc(todoList.id).update({
                    visited: "false"
                });
            }
        });      
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        console.log(this.props.orderedTodo)
        if(this.props.orderedTodo && this.props.todoList.visited == "false")
            this.moveListToTop();
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!todoList){
            return <React.Fragment/>
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
      todoList.id = id
  return {
    todoList,
    todoLists,
    orderedTodo: state.firestore.ordered.todoLists,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' ,orderBy: ['visited','desc']},
  ]),
)(ListScreen);