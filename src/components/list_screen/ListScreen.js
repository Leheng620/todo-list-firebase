import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Button,Modal } from 'react-materialize';

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
        //const newChange = {...this.state}
        //this.onChangeHandler(newChange);
    }

    onChangeName = (e) =>{
        const { target } = e;
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            name: target.value,
        })
    }
    onChangeOwner = (e) =>{
        const { target } = e;
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            owner: target.value,
        })
    }

    createNewItem = () =>{
        this.props.history.push({pathname: '/todoList/' + this.props.todoList.id+'/-1'})
    }

    delete = () =>{
        this.props.history.goBack();
        getFirestore().collection('todoLists').doc(this.props.todoList.id).delete();
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if(this.props.orderedTodo && this.props.todoList.visited == "false")
            this.moveListToTop();
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!todoList){
            return <React.Fragment/>
        }
        return (
            <div className='container' style={{width: '80%'}}>
                <h4 className="grey-text text-darken-3" style={{lineHeight:"210%"}}>Todo List</h4>
                <Modal header="Delete list?" trigger={<div id="list_trash">&#128465;</div>}>
                    <div>Are you sure you want to delete this list?</div>
                    <br></br>
                    <Button className='red darken-2 modal-close' waves="light" onClick={this.delete}>Yes</Button>
                    <br></br>
                    <br></br>
                    <div>The list will not be retreivable.</div>
                </Modal>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.onChangeName} value={todoList.name}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.onChangeOwner} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
                <div className="center-align">
                    <Button floating large className="red center-align" waves="light" onClick={this.createNewItem}>
                        <strong style={{fontSize : 'x-large'}}>+</strong>
                    </Button>
                </div>
                
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