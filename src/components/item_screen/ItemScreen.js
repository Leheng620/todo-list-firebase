import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Checkbox } from 'react-materialize';

class ItemScreen extends Component{

    render(){
        return (
            <div className="container">
                <h4 style={{lineHeight:"210%"}}>Item</h4>
                <div className="input-field">
                    <label for="Description" className="active">Description</label>
                    <input className="active" type="text" name="Description" id="Description" />
                </div>
                <div className="input-field">
                    <label for="Assignto" className="active">Assign to</label>
                    <input className="active" type="text" name="Assignto" id="Assignto" />
                </div>
                <div>
                    <label for="duedate" className="active">Due Date</label>
                    <input type='date' className="active" id="duedate" name="duedate"/>
                </div>
                <br/>
                <div>
                    <Checkbox value="Completed" label="Completed" />
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {

    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' ,orderBy: ['visited','desc']},
    ]),
  )(ItemScreen);