import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { editTask } from "./editTask";
import { useLoggedInUser } from "../../../context/LoggedInUser";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@mui/material";

export const FormCreateTaskDialog = ({
  dialogType,
  openDialog,
  setOpenDialog,
  setTaskResponse,
  setEditError,
  task,
}) => {
  const navigate = useNavigate();
  const [editTaskName, setEditTaskName] = useState(task.taskName);
  const [editTaskDescription, setEditTaskDescription] = useState(
    task.taskDescription
  );
  const [editTaskLinksUrl, setEditTaskLinksUrl] = useState(task.linksUrl);
  const [editTaskStatus, setEditTaskStatus] = useState(task.status);
  const [editTaskPriority, setEditTaskPriority] = useState(task.priority);
  const [topicValue, setTopicValue] = useState("");
  // const [editTopic, setEditTopic] = useState("");
  const [newTopic, setNewTopic] = useState(false);
  // const [editTaskTopics, setEditTaskTopics] = useState(task.topics);
  const [editTaskTopics, setEditTaskTopics] = useState([]);

  const { user } = useLoggedInUser();

  const dialogTitle =
    dialogType === 1
      ? "Create a New Task"
      : dialogType === 2
      ? `Edit Task ${task.taskName}`
      : `View Task ${task.taskName}`;
  const dialogSubtitle =
    dialogType === 1
      ? "Use the following fields to create a new task"
      : dialogType === 2
      ? "Use the following fields to edit this task"
      : "";

  const createNewTask = async (
    setResponse,
    taskName,
    taskDescription,
    linksUrl,
    topics,
    status,
    priority
  ) => {
    try {
      const { data } = await client.post("/task/", {
        taskName,
        taskDescription,
        linksUrl,
        topics,
        status,
        priority,
        user: { id: user.id },
      });
      setResponse(data);
      return;
    } catch (error) {
      //console.error(error.response.data);
      return error.data;
    }
  };

  const handleEditTask = async () => {
    const res = await editTask(
      setTaskResponse,
      task.id,
      editTaskName,
      editTaskDescription,
      editTaskTopics,
      editTaskLinksUrl,
      editTaskStatus,
      editTaskPriority
    );
    if (res?.status === "fail") {
      return setEditError(res.message);
    } else {
      // window.location.reload(false);
      refreshTasks();
      setOpenDialog(false);
    }
  };

  const refreshTasks = () => {
    navigate("../tasks", { replace: true });
  };

  const handleCreateTask = async () => {
    const res = await createNewTask(
      setTaskResponse,
      editTaskName,
      editTaskDescription,
      editTaskLinksUrl,
      editTaskTopics,
      editTaskStatus,
      editTaskPriority
    );
    if (res?.status === "fail") {
      console.log("Error Creating Task", res.message);
      //return setEditError(res.message);
    } else {
      // window.location.reload(false);
      refreshTasks();
      setOpenDialog(false);
    }
  };

  const handleTopicChange = (e) => {
    setTopicValue(e.target.value);
    console.log("HANDLE CHANGE ---------->", topicValue);
  };

  const handleBlur = () => {
    console.log("Pre Post--------------->", editTaskTopics, topicValue);
    // setEditTaskTopics({ editTaskTopics: [...editTaskTopics, topicValue]});
    let topics = editTaskTopics;
    topics.push(topicValue);
    setEditTaskTopics(topics);
    setTopicValue("");
    setNewTopic(false);
    // console.log("TASK TOPICS ------------------------------>", editTaskTopics)
  };

  const handleDeleteTopic = (value) => {
    // console.log("DELETE TOPIC PRE  ----------------------->", value, editTaskTopics)
    setEditTaskTopics((curr) => curr.filter((topic) => topic !== value));
    // console.log("DELETE TOPIC POST ----------------------->", value, editTaskTopics)
    setNewTopic(false);
  };

  const dismissDialog = () => {
    // console.log("DISMISS DIALOG -------------------------------------->")
    setOpenDialog(false);
  };

  useEffect(() => {
    if (openDialog) {
      console.log(
        "USEEFFECT OPEN DIALOG 1 ------------------------------------->",
        openDialog,
        task,
        editTaskTopics
      );
      setEditTaskName(task.taskName);
      setEditTaskDescription(task.taskDescription);
      setEditTaskLinksUrl(task.linksUrl);
      setEditTaskStatus(task.status);
      setEditTaskPriority(task.priority);
      task.topics.forEach((topic) => {
        const topicObj = { topic };
        console.log("      Value a ", topic, editTaskTopics, topicObj);
        setEditTaskTopics({
          ...editTaskTopics,
          topicObj,
        });
        console.log("      Value b ", topic, editTaskTopics, topicObj);
      });
      // setEditTaskTopics(task.topics);
      console.log(
        "USEEFFECT OPEN DIALOG 2 ------------------------------------->",
        openDialog,
        task,
        editTaskTopics
      );
    }
  }, [openDialog]);

  return (
    <div>
      {/* <Dialog open={openDialog} onClose={setOpenDialog}> */}
      <Dialog open={openDialog} scroll="body">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogSubtitle}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="taskName"
            fullWidth
            value={editTaskName}
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => setEditTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="taskDescription"
            label="Task Description"
            type="taskDescription"
            fullWidth
            value={editTaskDescription}
            variant="outlined"
            size="small"
            multiline
            inputProps={{ maxLength: 150 }}
            onChange={(e) => setEditTaskDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="linksUrl"
            label="Task Link URLs"
            type="linksUrl"
            fullWidth
            value={editTaskLinksUrl}
            variant="outlined"
            size="small"
            multiline
            inputProps={{ maxLength: 150 }}
            onChange={(e) => setEditTaskLinksUrl(e.target.value)}
          />
          <ul className="topics-list">
            {editTaskTopics.map((topic, index) => (
              <li className="topic-list-item" key={`${index}`} tabIndex="0">
                <span>{topic}</span>
                {
                  <DeleteForeverIcon
                    className="topic-list-item-delete"
                    tabIndex="0"
                    onClick={() => handleDeleteTopic(topic)}
                  />
                }
              </li>
              // <li className="topic-list-item" key={`${index}`} tabIndex="0">
              //   <span>{topic}</span>
              //   {
              //     <DeleteForeverIcon
              //     className="topic-list-item-delete"
              //     tabIndex="0"
              //     onClick={() => handleDeleteTopic(topic)}
              //   />
              //   }
              // </li>
            ))}
            <li>
              {newTopic ? (
                <Input
                  type="text"
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleTopicChange}
                  value={topicValue}
                  placeholder="Enter new line..."
                  sx={{ marginLeft: "15px" }}
                />
              ) : (
                <Button onClick={() => setNewTopic(true)}>
                  <AddIcon />
                  <span>New Line</span>
                </Button>
              )}
            </li>
          </ul>
          <FormControl fullWidth>
            <InputLabel id="create-task-status-select-label">
              Task Status
            </InputLabel>
            <Select
              labelId="create-task-status-select-label"
              id="create-task-status-select"
              value={editTaskStatus}
              label="Age"
              onChange={(e) => setEditTaskStatus(e.target.value)}
            >
              <MenuItem value={"TODO"}>To Do</MenuItem>
              <MenuItem value={"INPROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"COMPLETED"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="task-priority-select-label">
              Task Priority
            </InputLabel>
            <Select
              labelId="task-priority-select-label"
              id="task-priority-select"
              value={editTaskPriority}
              label="Age"
              onChange={(e) => setEditTaskPriority(e.target.value)}
            >
              <MenuItem value={"HIGH"}>High</MenuItem>
              <MenuItem value={"MEDIUM"}>Medium</MenuItem>
              <MenuItem value={"LOW"}>Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dismissDialog()}>Cancel</Button>
          {dialogType === 1 ? (
            <Button onClick={() => handleCreateTask()}>Create</Button>
          ) : null}
          {dialogType === 2 ? (
            <Button onClick={() => handleEditTask()}>Update</Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};