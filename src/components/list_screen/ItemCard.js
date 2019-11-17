import React from 'react';
import { Button,Icon } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

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
    fixKey = (list) => {
        for(let i = 0; i < list.length; i++){
          list[i].key = i;
        }
    }

    up = (e) =>{
        let todoList = this.props.todoList;
        let items = todoList.items;
        let item = this.props.item;
        let index = this.props.item.key;
        items.splice(index, 1);
        items.splice(index-1, 0, item);
        this.fixKey(items);
        e.preventDefault();
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            items: items
        });
    }
    down = (e) =>{
        let todoList = this.props.todoList;
        let items = todoList.items;
        let item = this.props.item;
        let index = this.props.item.key;
        items.splice(index, 1);
        items.splice(index+1, 0, item);
        this.fixKey(items);
        e.preventDefault();
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            items: items
        });
    }
    delete = (e) =>{
        let todoList = this.props.todoList;
        let items = todoList.items;
        let item = this.props.item;
        let index = this.props.item.key;
        items.splice(index, 1);
        this.fixKey(items);
        e.preventDefault();
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
            items: items
        });
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

                    <div style={{position: 'absolute'}}>
                        <Button
                            floating
                            fab={{direction: 'left'}}
                            className="red"
                            style={{position:'relative', left: '1340%', top: '-50px'}}
                        >
                            <Button floating small className="red" style={{right: '-30px'}} onClick={this.up}/>
                            <Button floating small className="yellow darken-1" style={{right: '-30px'}} onClick={this.down}/>
                            <Button floating small className="green" style={{right: '-30px'}} onClick={this.delete}/>
                        </Button>
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;