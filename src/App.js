import React, { useState } from "react";
import Todo from "./Todo";
import { Container, List, Paper } from "@material-ui/core";
import AddTodo from "./AddTodo";

function App() {
  const [items, setItems] = useState([
    { id: "todo0", title: "Todo 1", done: true },
    { id: "todo1", title: "Todo 2", done: false },
  ]);

  // add 함수 추가
  const add = (item) => {
    item.id = "ID-" + item.length; //key를 위한 id 추가
    item.done = false;
    setItems([...items, item]); //기존 배열을 복제 후 item 추가
    console.log("Items:", items);
  };

  //delete 함수 추가. (alt + shift + f 포매팅)
  const deleteHandler = (item) => {
    const newItems = items.filter((e) => e.id !== item.id);
    setItems(newItems, () => {
      console.log("Update Items: ", items);
    });
  };

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id} delete={deleteHandler} />
        ))}
      </List>
    </Paper>
  );

  //생성된 컴포넌트 JSX를 리턴한다.
  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="TodoList">{todoItems} </div>
      </Container>
    </div>
  );
}

export default App;
