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

    buildDisableUpButton = () =>{
        if(this.props.item.key == 0){
            return (<Button className="buttons grey lighten-1 black-text" id='upbb' onClick={this.up} disabled><strong className='textali'>&#x21e7;</strong></Button>)
        }else{
            return (<Button className="buttons indigo lighten-4 black-text" id='upbb' onClick={this.up}><strong className='textali'>&#x21e7;</strong></Button>)
        }
    }
    buildDisableDownButton = () => {
        if(this.props.item.key == this.props.todoList.items.length-1){
            return (<Button className="buttons grey lighten-1 black-text" id='downbb' onClick={this.down} disabled><strong className='textali'>&#x21e9;</strong></Button>)
        }else{
            return(<Button className="buttons orange lighten-2 black-text" id='downbb' onClick={this.down}><strong className='textali'>&#x21e9;</strong></Button>)
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

                    {/* <div style={{position: 'absolute'}}>
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
                        
                    </div> */}
                    <nav className="contain">
                        <div className='hor'>
                            
                            {this.buildDisableUpButton()}
                            {this.buildDisableDownButton()}                           
                            <Button className="buttons black-text" id='deletebb' onClick={this.delete}><strong className='textali'>&#10005;</strong></Button>

                            <Button className="buttons bigsize light-green darken-3 black-text"><strong className='textali'>&#9776;</strong></Button>
                        </div>
                        
                    </nav>
                </div>
            </div>
        );
    }
}
export default ItemCard;