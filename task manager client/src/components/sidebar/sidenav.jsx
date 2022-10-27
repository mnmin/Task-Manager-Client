import styles from "./sidenav.module.css";
// import { NavLink } from "react-router-dom";
// import { navData } from "../../utils/navdata";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

import { FormCreateTaskDialog } from "../tasks/utils/createTask";

export default function Sidenav() {
  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open);
    if (open) {
      setShowButtons(!showButtons);
    } else {
      setTimeout(() => {
        setShowButtons(!showButtons);
      }, "300");
    }
  };
  const [showButtons, setShowButtons] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const NewTask = () => (
    <Button variant="text" onClick={() => setOpenDialog(true)}>
      New Task
    </Button>
  );

  const SortByPriority = () => (
    <Button variant="text">
      Sort Priority
      <input hidden accept="image/*" multiple type="file" />
    </Button>
  );

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      <>
        <FormCreateTaskDialog
          dialogType={1}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          task={{taskName: "", taskDescription: "", linksUrl: "", topics: "", status: "TODO", priority: "MEDIUM"}}
          // handleClick={handleClick}
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => setOpenDialog(true)}
          >
            {/* <input hidden accept="image/*" type="file" /> */}
            <AddIcon />
          </IconButton>
          {showButtons ? <NewTask /> : null}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <SortIcon />
          </IconButton>
          {showButtons ? <SortByPriority /> : null}
        </Stack>
      </>
      {/* {navData.map(item =>{
            return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            {item.icon}
            <span className={styles.linkText}>{item.text}</span>
        </NavLink>
        })} */}
    </div>
  );
}
