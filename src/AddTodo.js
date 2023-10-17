import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";

function AddTodo({ add }) {
  const [item, setItem] = useState({ title: "" });

  const onInputChange = (e) => {
    const thisItem = { ...item }; // 객체를 복제하여 불변성 유지
    thisItem.title = e.target.value;
    setItem(thisItem);
    //console.log(thisItem);
  };

  const onButtonClick = () => {
    add(item);
    setItem({ title: "" }); // text 값을 추가하고 입력 필드 초기화
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            fullWidth
            onChange={onInputChange}
            value={item.title}
            onKeyDown={enterKeyEventHandler} //변경점
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <Button
            className="addBtn"
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddTodo;
