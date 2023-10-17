import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

function DeleteChecked(props) {
  const deleteHandler = () => {
    props.deleteForCompleted();
  };

  return (
    <div>
      Delete Completed Items
      <IconButton aria-label="Delete Completed Todo" onClick={deleteHandler}>
        <DeleteOutlined />
      </IconButton>
    </div>
  );
}

export default DeleteChecked;
