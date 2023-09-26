import './App.css';
import React from 'react'
import Todo from './Todo';

class App extends React.Component{
  constructor(props) { //매개변수 props 생성자
    super(props); //매개변수 props 초기화
    this.state = { //item에 item.id item.title item.done 매개변수 이름과 값 할당
      item : {
        id: 0,
        title: "Hello World 1",
        done: true
      }
    };
  }

  render() {
    return (  //매개변수 item 에 변수명/값을 전달
      <div className='App'>
        <Todo item={this.state.item}/>
      </div>
    )
  }
}

export default App;
