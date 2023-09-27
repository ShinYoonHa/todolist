import React, { useState } from "react";
import {
  InputBase,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

function Todo(props) {
  const [readOnly, setReadOnly] = useState(true);
  const { item, delete: deleteHandler } = props;

  const deleteEventHandler = () => {
    deleteHandler(item);
  };
  const offReadOnlyMode = () => {
    console.log("Event!", readOnly);
    setReadOnly(false);
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
    }
  };
  const editEventHandler = (e) => {
    const thisItem = { ...item };
    thisItem.title = e.target.value;
    props.setItem(thisItem);
  };
  const checkboxEventHandler = (e) => {
    console.log("check box event call");
    const thisItem = { ...item };
    thisItem.done = thisItem.done ? false : true; // thisItemdone = !thisitem.done
    props.setItem(thisItem);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: readOnly,
          }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyDown={enterKeyEventHandler}
        />
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={deleteEventHandler}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
