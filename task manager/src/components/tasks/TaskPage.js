import { useState, useEffect } from "react";
// import PostForm from "./PostForm";
import client from "../../utils/client";
import "./style.css";
import jwt_decode from "jwt-decode";
import { renderTasks } from "./utils/getAllTasks";
import TaskItem from "./TaskItem";
// import StudentList from "../../components/studentList/StudentList";
// import TeacherAdmin from "../teacher/TeacherAdmin";
// import PostsOfTheWeek from "./PostsOfTheWeek";
import { Alert } from "@mui/material";
// import { useLoggedInUser } from "../../context/LoggedInUser";

const TasksPage = () => {
  // const postPref = useLoggedInUser().user.postPrivacyPref === "PRIVATE";
  // const [task, setTask] = useState({ content: "", isPrivate: false });
  // const [postResponse, setPostResponse] = useState("");
  // const [posts, setPosts] = useState([]);
  // const [postsOfTheWeek, setPostsOfTheWeek] = useState([]);
  // const [isTeacherOrAdmin, setIsTeacherOrAdmin] = useState(false);
  // const [postError, setPostError] = useState(false);

  const [task, setTask] = useState({ content: "" });
  const [taskResponse, setTaskResponse] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState(false);

  // CHANGE THIS ONE
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
    if (!token) {
      return;
    }

    const decoded = jwt_decode(token);
    let id = decoded.userId;

    client
      .get(`/user/${id}`)
      // .then((res) => {
      //   const userRole = res.data.data.user.role;
      //   if (userRole === "TEACHER" || userRole === "ADMIN") {
      //     setIsTeacherOrAdmin(true);
      //   }
      // })
      .catch((err) => console.error("user error", err));
    renderTasks(setTasks);
    setTask({ ...task });
    // eslint-disable-next-line
  }, [taskResponse]);

  // NEED THIS ONE
  // const createTask = async (event) => {
  //   event.preventDefault();
  //   client
  //     .post("/task", task)
  //     .then((res) => setPostResponse(res.data))
  //     .then(() => {
  //       setTask({ ...task, content: "" });
  //     })
  //     .catch((err) => {
  //       console.error(err.response);
  //       setPostError(true);

  //       setTimeout(() => {
  //         setPostError(false);
  //       }, "3000");
  //     });
  // };

  // const handleChange = (event) => {
  //   if (event.target.name === "content") {
  //     event.preventDefault();
  //     const { value } = event.target;
  //     setPost({
  //       ...post,
  //       content: value,
  //     });
  //   }
  //   if (event.target.name === "switch") {
  //     setPost({
  //       ...post,
  //       isPrivate: !post.isPrivate,
  //     });
  //   }
  //   if (event.target.name === "toggle") {
  //     setPost({
  //       ...post,
  //       isPinned: !post.isPinned,
  //     });
  //   }
  // };

  return (
    <>
      <section className="posts-section">
        {taskError && <Alert severity="error">Must provide content</Alert>}

        <p>Status: {taskResponse.status}</p>
        {/* <PostForm
          handleSubmit={createPost}
          handleChange={handleChange}
          value={post}
        /> */}

        {/* <PostsOfTheWeek
          posts={postsOfTheWeek}
          setPost={setPost}
          setPostResponse={setPostResponse}
        /> */}

        {tasks?.length > 0 ? (
          <ul className="posts-list">
            {tasks?.map((task, index) => (
              <TaskItem
                task={task}
                key={index}
                setTask={setTask}
                setTaskResponse={setTaskResponse}
                // isTeacherOrAdmin={isTeacherOrAdmin}
              />
            ))}
          </ul>
        ) : (
          <p className="no-posts-message">There are no tasks at the moment.</p>
        )}
      </section>
      {/* {!isTeacherOrAdmin && <StudentList />} */}
    </>
  );
};

export default TasksPage;
