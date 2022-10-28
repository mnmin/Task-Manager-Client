import { useState, useEffect } from "react";
import client from "../../utils/client";
import "./style.css";
import jwt_decode from "jwt-decode";
import { renderTasks, renderTasksByUserId, renderTasksByUserIdAndPriority } from "./utils/getAllTasks";
import TaskItem from "./TaskItem";
import { Alert } from "@mui/material";
import Sidenav from "../sidebar/sidenav";

const TasksPage = () => {
  const [task, setTask] = useState({ content: "" });
  const [taskResponse, setTaskResponse] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState(false);
  const [sortOrder, setSortOrder] = useState({sortBy: "upd1atedAt", order: "desc", priorityValues: "*ALL"});

  // CHANGE THIS ONE
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
    if (!token) {
      return;
    }

    const decoded = jwt_decode(token);
    let userId = decoded.userId;
    console.log("TASKPAGE TOKEN", token, userId);

    client.get(`/user/${userId}`).catch((err) => console.error("user error", err));
    if(sortOrder.sortBy === "updatedAt") {
      console.log("SortOrder ---------------------->", 1, sortOrder.order, sortOrder.priorityValues)
      renderTasksByUserId(userId, setTasks);
    } else {
      console.log("SortOrder ---------------------->", 2, sortOrder.order, sortOrder.priorityValues)
      renderTasksByUserIdAndPriority(userId, sortOrder.order === "desc" ? 1 : 2, sortOrder.priorityValues, setTasks);
    }
    console.log("TASKPAGE tasks------------------------>", tasks);
    setTask({ ...task });
    // eslint-disable-next-line
  }, [taskResponse, sortOrder]);

  return (
    <>
      <div className="sidenav-main">
        <Sidenav openDialog={sortOrder} setSortOrder={setSortOrder} />
        <div className="tasks-section">
          {taskError && <Alert severity="error">Must provide content</Alert>}

          <p>{taskResponse.status}</p>

          {tasks?.length > 0 ? (
            <ul className="tasks-list">
              {tasks?.map((task, index) => (
                <TaskItem
                  task={task}
                  key={index}
                  setTask={setTask}
                  setTaskResponse={setTaskResponse}
                />
              ))}
            </ul>
          ) : (
            <p className="no-posts-message">
              There are no tasks at the moment.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TasksPage;
