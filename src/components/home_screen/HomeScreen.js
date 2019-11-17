import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import {Modal, Button} from 'react-materialize';
import uuid from 'uuid';
import { getFirestore } from 'redux-firestore';
import * as actionCreators from '../../store/actions/actionCreators'

class HomeScreen extends Component {

    handleNewList = () =>{
        const fireStore = getFirestore();
        const { todoLists } = this.props;
        let newTodo = {
            items: [],
            name: "unknown",
            owner: "unknown",
            visited: "false"
        }
        //this.props.dispatch(actionCreators.createTodoList(newTodo));
        fireStore.collection('todoLists').add(newTodo).then(doc => {
            this.props.history.push({pathname: '/todoList/'+doc.id})
        });
        //this.dis(todoLists);
    }
    dis = (todoLists) =>{
        this.props.dispatch({type:'test',todoLists});
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        this.dis(this.props.todoLists);
        console.log('home render called')
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container" style={{paddingTop:'5px'}}>
                                <Button className="home_new_list_button" waves="light" large style={{height:'120px'}} onClick={this.handleNewList}>
                                    Create a New To Do List
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.ordered.todoLists
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' ,orderBy: ['visited','desc']},
    ]),
)(HomeScreen);