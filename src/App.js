import React from "react";
import Todo from "./Todo";
import { Container, List, Paper } from "@material-ui/core";
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    //매개변수 props 생성자
    super(props); //매개변수 props 초기화
    this.state = {
      //item에 item.id item.title item.done 매개변수 이름과 값 할당
      items: [],
    };
  }
  // add 함수 추가
  add = (item) => {
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  //update함수
  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  //delete 함수
  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.date });
    });
  };

  componentDidMount() {
    call("/todo", "GET", null).then((response) => {
      this.setState({ items: response.data });
    });
  }

  render() {
    //todoItems에 this.state.items.length가 0보다 크다면 true이므로 && 뒤에 값을 넘겨줌
    //todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과임
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    //생성된 컴포넌트 JSX를 리턴한다.
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems} </div>
        </Container>
      </div>
    );
  }
}

export default App;
