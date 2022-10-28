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
import { useState } from "react";
import client from "../../../utils/client";
import { useLoggedInUser } from "../../../context/LoggedInUser";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@mui/material";

export const FormCreateTaskDialog = ({ openDialog, setOpenDialog }) => {
  const navigate = useNavigate();
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskLinksUrl, setEditTaskLinksUrl] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("");

  const [topicValue, setTopicValue] = useState("");
  const [editTopic, setEditTopic] = useState("");
  const [taskResponse, setTaskResponse] = useState("");
  const [newTopic, setNewTopic] = useState(false);
  const [taskTopics, setTaskTopics] = useState([]);

  const { user } = useLoggedInUser();

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
      console.error(error.response.data);
      return error.response.data;
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
      taskTopics,
      editTaskStatus,
      editTaskPriority
    );
    if (res?.status === "fail") {
      console.log("Error Creating Task", res.message);
      //return setEditError(res.message);
    } else {
      // window.location.reload(false);
      //refreshTasks();
      setOpenDialog(false);
    }
  };

  const handleTopicChange = (e) => {
    setTopicValue(e.target.value);
    console.log("HANDLE CHANGE ---------->", topicValue);
  };

  const handleBlur = () => {
    console.log("Pre Post--------------->", taskTopics, topicValue);
    // setTaskTopics({ taskTopics: [...taskTopics, topicValue]});
    let topics = taskTopics;
    topics.push(topicValue);
    setTaskTopics(topics);
    setTopicValue("");
    setNewTopic(false);
    // console.log("TASK TOPICS ------------------------------>", taskTopics)
  };

  const handleDeleteTopic = (index) => {
    let topics = taskTopics;
    // console.log("TOPICS--------------------->", taskTopics)
    topics.splice(index, 1);
    // console.log("TOPICS AFTER--------------------->", taskTopics)
    setTaskTopics(topics);
    // console.log("INDEX------------------->", index)
  };

  return (
    <div>
      {/* <Dialog open={openDialog} onClose={setOpenDialog}> */}
      <Dialog open={openDialog} scroll="body">
        <DialogTitle>Create a New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use the following fields to create a new task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="taskName"
            fullWidth
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
            variant="outlined"
            size="small"
            multiline
            inputProps={{ maxLength: 150 }}
            onChange={(e) => setEditTaskLinksUrl(e.target.value)}
          />
          <ul className="topics-list">
            {taskTopics.map((topic, index) => (
              <li className="topic-list-item" key={`${index}`} tabIndex="0">
                <span>{topic}</span>
                {
                  <DeleteForeverIcon
                    className="topic-list-item-delete"
                    tabIndex="0"
                    onClick={() => handleDeleteTopic(index)}
                  />
                }
              </li>
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
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleCreateTask()}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
