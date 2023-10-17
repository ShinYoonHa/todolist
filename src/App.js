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
import DeleteChecked from "./DeleteChecked";
import "./App.css";
import "./SignUp.css";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const deleteForCompleted = () => {
    const thisItems = items;
    thisItems.map((e) => {
      //todoList 목록을 돌면서 '수행완료' 된 리스트 삭제
      if (e.done === true) {
        call("/todo", "DELETE", e).then((response) => {
          setItems(response.data);
        });
      }
    });
  };

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  var todoItems = currentItems.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {currentItems.map((item, idx) => (
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
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">공간예약 플랫폼</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit">회원정보수정</Button>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  //loading 중이 아닐 때
  var todoListPage = (
    <>
      <Grid justifyContent="center" container>
        {navigationBar}
        <Container>
          <AddTodo add={add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </Grid>
      <Grid justifyContent="center" container>
        <Grid item className="Pagination">
          {Array.from(
            { length: Math.ceil(items.length / itemsPerPage) },
            (v, i) => (
              <Button
                className="pageBtn"
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            )
          )}
        </Grid>
      </Grid>
    </>
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
