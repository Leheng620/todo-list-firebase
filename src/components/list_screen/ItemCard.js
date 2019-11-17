import React from 'react';
import { Button,Icon } from 'react-materialize';

class ItemCard extends React.Component {

    showCompleted = (isCompleted) =>{
        if(isCompleted){
            return (<div className='green-text' style={{position: 'absolute', left: '60%', top: '63%'}}>
                    Completed
                </div>)
        }
        else{
            return (<div className='red-text' style={{position: 'absolute', left: '60%', top: '63%'}}>
                Pending
            </div>)
        }
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link green lighten-4">
                <div className="grey-text text-darken-3">
                    <div style={{overflow: 'hidden'}}>
                        <span className="card-title">{item.description}</span>
                    </div>
                    <div>
                        Assigned To: <strong style={{fontWeight:'bold'}}>{item.assigned_to}</strong>
                    </div>
                    <div style={{position: 'absolute', left: '35%', top: '63%'}}>
                        {item.due_date}
                    </div>
                    {this.showCompleted(item.completed)}

                    
                </div>
            </div>
        );
    }
}
export default ItemCard;