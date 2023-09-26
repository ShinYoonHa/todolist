import {
  InputBase,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

function Todo(props) {
  //const item = state.item;
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const [del, setDel] = useState(props.del);

  const deleteEventHandler = () => {
    delete(item);
  };
  const offReadOnlyMode = () => {
    setReadOnly(false);
    useEffect(() => {
      console.log();
    }, [readOnly]);
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
    }
  };
  const editEventHandler = (e) => {
    const thisItem = item;
    thisItem.title = e.target.value;
    setItem(thisItem);
  };
  const checkboxEventHandler = (e) => {
    const thisItem = item;
    thisItem.done = thisItem.done ? false : true; // thisItemdone = !thisitem.done
    setItem(item);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: this.state.readOnly,
          }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={this.offReadOnlyMode}
          onChange={this.editEventHandler}
          onKeyDown={this.enterKeyEventHandler}
        />
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
