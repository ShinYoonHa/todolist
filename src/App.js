import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import {
  AppBar,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // add 함수 추가
  const add = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  //delete 함수 추가
  const deleteHandler = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const update = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);
  // const componentDidMount = () => {
  //   call("/todo", "GET", null).then(
  //     (response) => setItems({ items: response.data }),
  //     setLoading({ loading: false })
  //   );
  // };

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo
            item={item}
            key={item.id}
            delete={deleteHandler}
            update={update}
          />
        ))}
      </List>
    </Paper>
  );

  //navigationBar
  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justify-content="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  //loading 중이 아닐 때
  var todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  //loading 중일 때
  var loadingPage = <h1>로딩중..</h1>;
  var content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  // 생성된 컴포넌트 JPX를 리턴한다.
  return <div className="App">{content}</div>;
}
export default App;
