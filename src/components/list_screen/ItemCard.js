import React from 'react';

class ItemCard extends React.Component {

    showCompleted = (isCompleted) =>{
        if(isCompleted){
            return (<div className='green-text' style={{position: 'absolute', left: '65%', top: '36%'}}>
                    Completed
                </div>)
        }
        else{
            return (<div className='red-text' style={{position: 'absolute', left: '65%', top: '36%'}}>
                Pending
            </div>)
        }
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link green lighten-4">
                <div className="grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <div>
                        Assigned To: <strong className="bold">{item.assigned_to}</strong>
                    </div>
                    <div style={{position: 'absolute', left: '35%', top: '36%'}}>
                        {item.due_date}
                    </div>
                    {this.showCompleted(item.completed)}
                </div>
            </div>
        );
    }
}
export default ItemCard;