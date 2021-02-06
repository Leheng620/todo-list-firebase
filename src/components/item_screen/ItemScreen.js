import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Checkbox, Button } from 'react-materialize';

class ItemScreen extends Component{

    handleCancel = () =>{
        this.props.history.goBack();
    }
    handleSubmit = () => {
        let items = this.props.todoList.items;
        let item = this.props.item;
        item.description = document.getElementById('Description').value;
        if(item.description === "")
            item.description = "Unknown";
        item.assigned_to = document.getElementById('Assign_to').value;
        if(item.assigned_to === "")
            item.assigned_to = "Unknown";
        item.due_date = document.getElementById('duedate').value;
        item.completed = document.getElementById('checkbox').checked;
        if(item.key === -1){
            items.push(item);
            item.key = items.length - 1;
        }
        this.props.history.goBack();
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            items: items
        })
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            items: items
        })
    }

    activeLabel = (name,content) =>{
        if(content === ""){
            return (<label htmlFor={name}>{name}</label>)
        }else{
            return(<label htmlFor={name} className="active">{name}</label>)
        }
    }

    render(){
        const { item } = this.props;
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!item){
            return <React.Fragment/>
        }
        return (
            <div className="container">
                <h4 style={{lineHeight:"210%"}}>Item</h4>
                <div className="input-field">
                    {this.activeLabel('Description',item.description)}
                    <input className="active" type="text" name="Description" id="Description" defaultValue={item.description}/>
                </div>
                <div className="input-field">
                    {this.activeLabel('Assign_to', item.assigned_to)}
                    <input className="active" type="text" name="Assign_to" id="Assign_to" defaultValue={item.assigned_to}/>
                </div>
                <div>
                    <label htmlFor="duedate" className="active">Due Date</label>
                    <input type='date' className="active" id="duedate" name="duedate" defaultValue={item.due_date}/>
                </div>
                <br/>
                <div>
                    <label>
                        <input type="checkbox" defaultChecked={item.completed} id='checkbox'/>
                        <span>Completed</span>
                    </label>
                </div>
                <br/>
                <div>
                <Button waves="light" style={{marginRight: '5px'}} onClick={this.handleSubmit}>
                    Submit
                </Button>
                <Button waves="light" style={{marginRight: '5px'}} onClick={this.handleCancel}>
                    Cancel
                </Button>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { key } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    const newItem = {
        description: "",
        assigned_to: "",
        due_date: "",
        checked: false,
        key: -1
    }
    const item = !todoList ? null : key==-1 ? newItem : todoList.items[key];
    if(todoList)
        todoList.id = id
    return {
        item,
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' ,orderBy: ['visited','desc']},
    ]),
  )(ItemScreen);