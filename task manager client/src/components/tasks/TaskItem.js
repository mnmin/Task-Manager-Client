import { Button, TextField, ClickAwayListener } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ClearIcon from "@mui/icons-material/Clear";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useEffect, useState } from "react";
import { deleteTask } from "./utils/deleteTask";
import { editTask } from "./utils/editTask";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../../context/LoggedInUser";

import { blue, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormUpdateTaskDialog } from "./utils/editTaskPanel";
import { FormCreateTaskDialog } from "./utils/createTask";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
      contrastText: blue[500],
    },
  },
});

const TaskItem = ({ task, setTaskResponse }) => {
  const [isOwner, setIsOwner] = useState(true);
  // const [isPrivate, setIsPrivate] = useState(task.isPrivate);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskLinksUrl, setEditTaskLinksUrl] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("");
  const [editError, setEditError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(3); // 3 = view
  const { user } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TaskItem", task);
    setIsOwner(true);
    resetDelBtn();
    resetEditBtn();
  }, [task, user.id]);

  const resetDelBtn = () => {
    setIsDeleting(false);
  };

  const resetEditBtn = () => {
    setIsEditing(false);
  };

  const handleEditTask = async () => {
    const res = await editTask(
      setTaskResponse,
      task.id,
      editTaskName,
      editTaskDescription,
      editTaskLinksUrl,
      editTaskStatus,
      editTaskPriority
    );
    if (res?.status === "fail") {
      return setEditError(res.message);
    }
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    if (!isDeleting) {
      setIsDeleting(true);
    } else {
      deleteTask(setTaskResponse, task.id);
      setIsDeleting(false);
    }
  };

  let liClasses = "task-item";

  const handleOpenViewDialog = () => {
    setDialogType(3);
    setOpenDialog(true);
    console.log("HANDLE VIEW -------------------->", openDialog, task);
  };

  function handleOpenEditDialog() {
    setDialogType(2);
    setOpenDialog(true);
    console.log("HANDLE EDIT -------------------->", openDialog, task);
  }

  const TryAgain = () => {
    try {
      return editError;
    } finally {
      setTimeout(() => {
        setEditError("");
      }, 3000);
    }
  };

  return (
    <li className={liClasses}>
      <div className="task-wrap">
        <div className="task-header-wrap">
          <div className="task-profile-wrap">
            <h3 className={"task-owner-name"}>
              <div>
                <p className="task-id">Task # {task.id}</p>
              </div>
            </h3>
          </div>
        </div>
        {editError && (
          <div style={{ textAlign: "left", color: "red" }}>
            <TryAgain />
          </div>
        )}
        {isEditing ? (
          <>
            <div className="edit-content-wrap">
              <TextField
                autoFocus
                fullWidth
                value={task.taskName}
                variant="outlined"
                size="small"
                inputProps={{ maxLength: 50 }}
                onChange={(e) => setEditTaskName(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={task.taskDescription}
                variant="outlined"
                size="small"
                multiline
                inputProps={{ maxLength: 150 }}
                onChange={(e) => setEditTaskDescription(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={task.linksUrl}
                variant="outlined"
                size="small"
                multiline
                inputProps={{ maxLength: 150 }}
                onChange={(e) => setEditTaskLinksUrl(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={task.status}
                variant="outlined"
                size="small"
                // multiline
                inputProps={{ maxLength: 150 }}
                onChange={(e) => setEditTaskStatus(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={task.priority}
                variant="outlined"
                size="small"
                // multiline
                inputProps={{ maxLength: 150 }}
                onChange={(e) => setEditTaskPriority(e.target.value)}
              ></TextField>
              {/* <div className="icon-buttons"> */}
              <Button
                className="submit-edited-task" //setOpenDialog
                onClick={handleEditTask}
              >
                <ArrowUpwardIcon className="icon" />
              </Button>

              <Button
                className="cancel-edit"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <ClearIcon classname="icon" />
              </Button>
            </div>
            {/* </div> */}
          </>
        ) : (
          <>
            <p className="task-content">{task.taskName}</p>
            <p className="task-content">{task.taskDescription}</p>
            <p className="task-content">{task.linksUrl}</p>
            {/* <p className="task-content">{task.topics}</p> */}
            <p className="task-content-select">{task.status}</p>
            <p className="task-content-select">{task.priority}</p>
          </>
        )}
        {/* <p className="task-content">{task.taskDescription}</p> */}
        <div className="button-nav-wrap">
          {isOwner && (
            <div className="view-button-form-wrap">
                <Button
                  className="view-button-icon"
                  onClick={handleOpenViewDialog}
                >
                  <OpenInFullIcon />
                </Button>
            </div>
          )}
          {isOwner && (
            <div className="edit-button-form-wrap">
              <FormCreateTaskDialog
                dialogType={dialogType}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                setTaskResponse={setTaskResponse}
                setEditError={setEditError}
                task={task}
              />
              {!isEditing && (
                <Button
                  className="edit-button-icon"
                  //onClick={() => setIsEditing(true)}
                  //onClick={() => {setOpenDialog(true)}}
                  onClick={handleOpenEditDialog}
                >
                  <EditIcon />
                </Button>
              )}
            </div>
          )}
          {isOwner && (
            <div className="delete-button">
              <ClickAwayListener onClickAway={resetDelBtn}>
                <Button
                  className="delete-button-icon"
                  color={`${isDeleting ? "error" : "info"}`}
                  onClick={handleDeleteTask}
                >
                  <DeleteIcon />
                </Button>
              </ClickAwayListener>
              {isDeleting && (
                <Button variant="text" color="error" onClick={handleDeleteTask}>
                  confirm delete?
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
