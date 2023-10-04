import {
  InputBase,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import React, { useState } from "react";

function Todo(props) {
  const [item, setItem] = props(useState(props.item));
  const [readOnly, setReadOnly] = useState(true);

  const deleteEventHandler = () => {
    props.delete(item);
  };
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
      props.update(item);
    }
  };
  const editEventHandler = (e) => {
    const thisItem = { ...item };
    thisItem.title = e.target.value;
    setItem(thisItem);
  };

  function checkboxEventHandler() {
    const thisItem = { ...item };
    thisItem.done = thisItem.done ? false : true; // thisItemdone = !thisitem.done
    setItem(thisItem);
    setReadOnly(true);
    props.update(thisItem);
  }

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
