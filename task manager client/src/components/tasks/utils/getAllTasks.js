import client from "../../../utils/client";

async function getAllTasks() {
  try {
    const response = await client.get("/tasks");
    return response.data.data;
  } catch (err) {
    console.error("tasks error", err);
  }
}

export function renderTasks(setTasks) {
  let allTasks = [];
  getAllTasks()
    .then((response) => {
      console.log("GETALLTASKS response", response);
      allTasks = response;
      console.log("GETALLTASKS alltasks", allTasks);
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}

async function getAllTasksByUserId(userId) {
  try {
    if (userId) {
      const response = await client.get(`/tasks/${userId}`);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export function renderTasksByUserId(userId, setTasks) {
  let allTasks = [];
  getAllTasksByUserId(userId)
    .then((response) => {
      console.log("GETALLTASKS by USERID response", response);
      allTasks = response;
      console.log("GETALLTASKS by USERID alltasks", allTasks);
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}

<<<<<<< HEAD
async function getAllTasksByUserIdAndPriority(userId, priorityOrder, priorityValues) {
  try {
    if (userId) {
      const response = await client.get(`/tasks/${userId}/priorityOrder/${priorityOrder}/priorityValues/${priorityValues}`);
=======
async function getAllTasksByUserIdAndPriority(userId, priorityOrder) {
  try {
    if (userId) {
      const response = await client.get(`/tasks/${userId}/priorityOrder/${priorityOrder}`);
>>>>>>> 5b27ff40b22a332faf6b0645d0cd1d8503b41db1
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
}

<<<<<<< HEAD
export function renderTasksByUserIdAndPriority(userId, priorityOrder, priorityValues, setTasks) {
  let allTasks = [];
  getAllTasksByUserIdAndPriority(userId, priorityOrder, priorityValues)
=======
export function renderTasksByUserIdAndPriority(userId, priorityOrder, setTasks) {
  let allTasks = [];
  getAllTasksByUserIdAndPriority(userId, priorityOrder)
>>>>>>> 5b27ff40b22a332faf6b0645d0cd1d8503b41db1
    .then((response) => {
      console.log("GETALLTASKS by USERID and PRIORITY response", response);
      allTasks = response;
      console.log("GETALLTASKS by USERID and PRIORITY alltasks", allTasks);
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}
