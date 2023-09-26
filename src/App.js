import React from 'react'
import Todo from './Todo';
import { Container, List, Paper } from '@material-ui/core';
import './App.css';
import AddTodo from './AddTodo';

class App extends React.Component{
  constructor(props) { //매개변수 props 생성자
    super(props); //매개변수 props 초기화
    this.state = { //item에 item.id item.title item.done 매개변수 이름과 값 할당
      items : [
        {id: 0, title: "Todo 1", done: true},
        {id: 1, title: "Todo 2", done: false},
      ],
    };
  }
  //(1) add 함수 추가
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-"+ thisItems.length; //key를 위한 id 추가
    item.done = false;
    thisItems.push(item);
    this.setState({items:thisItems}); //update state
    console.log("Items:", this.state.items);
  }

  render() {
    //todoItems에 this.state.items.length가 0보다 크다면 true이므로 && 뒤에 값을 넘겨줌
    //todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과임
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id}/>
          ))}
        </List>
      </Paper>
    );
    //(2) add 함수 연결
    return (  //생성된 컴포넌트 JSX를 리턴한다.
      <div className='App'>
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className='TodoList'>{todoItems} </div>
        </Container>
      </div>
    );
  }
}

export default App;