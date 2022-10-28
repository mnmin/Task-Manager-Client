import styles from "./sidenav.module.css";
// import { NavLink } from "react-router-dom";
// import { navData } from "../../utils/navdata";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useState, ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";


import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { red, blue, green } from "@mui/material/colors";
import { FormCreateTaskDialog } from "../tasks/utils/createTask";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

export default function Sidenav({ sortOrder, setSortOrder }) {
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
  const [sortOrderType, setSortOrderType] = useState(true);
  const [sortPriorityHigh, setSortPriorityHigh] = useState("HIGH");
  const [sortPriorityMedium, setSortPriorityMedium] = useState("MEDIUM");
  const [sortPriorityLow, setSortPriorityLow] = useState("LOW");
  const [checkedHigh, setCheckedHigh] = useState(true);
  const [checkedMedium, setCheckedMedium] = useState(true);
  const [checkedLow, setCheckedLow] = useState(true);

  const toggleSortOrderType = () => {
    setSortOrderType(!sortOrderType);
    console.log("SORT ORDER CHANGED", sortOrderType);
  };

  const NewTaskBtn = () => (
    <Button variant="text" onClick={() => setOpenDialog(true)}>
      New Task
    </Button>
  );

  const SortByPriorityBtn = () => (
    <Button variant="text" onClick={() => sortOrderActivate()}>
      Sort Priority
    </Button>
  );

  const sortOrderActivate = () => {
    let values = ""
    if(sortPriorityHigh) {
      values = sortPriorityHigh
    }
    if(sortPriorityMedium) {
      if(values.length > 0) {
        values += "-"
      }
      values += sortPriorityMedium
    }
    if(sortPriorityLow) {
      if(values.length > 0) {
        values += "-"
      }
      values += sortPriorityLow
    }
    setSortOrder({
      sortBy: "priority",
      sortOrder: sortOrderType ? "desc" : "asc",
      priorityValues: values
    });
  };

  const handleCheckHighPriority = (event) => {
    setCheckedHigh(event.target.checked);
    if(event.target.checked) {
      setSortPriorityHigh("HIGH")
    } else {
      setSortPriorityHigh("")
    }
    console.log("CheckBox High", event.target.checked, sortPriorityHigh);
  };

  const handleCheckMediumPriority = (event) => {
    setCheckedMedium(event.target.checked);
    if(event.target.checked) {
      setSortPriorityMedium("MEDIUM")
    } else {
      setSortPriorityMedium("")
    }
  }

  const handleCheckLowPriority = (event) => {
    setCheckedLow(event.target.checked);
    if(event.target.checked) {
      setSortPriorityLow("LOW")
    } else {
      setSortPriorityLow("")
    }
  }

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
          task={{
            taskName: "",
            taskDescription: "",
            linksUrl: "",
            topics: [],
            status: "TODO",
            priority: "MEDIUM",
          }}
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
          {showButtons ? <NewTaskBtn /> : null}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => toggleSortOrderType()}
          >
            <SortIcon />
          </IconButton>
          {showButtons ? <SortByPriorityBtn /> : null}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => toggleSortOrderType()}
          >
            <SortIcon />
          </IconButton> */}
          {/* <Button variant="text" >
            Priority
          </Button> */}
          <TextField
            id="standard-basic"
            // label="Priority"
            variant="standard"
            value="PRIORITY"
            inputProps={{ readOnly: true }}
            sx={{ input: { color: "#1976d2" } }}
            style={{ paddingLeft: '10px' }}
          />
        </Stack>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
        <FormGroup style={{ paddingLeft: '10px' }}>
          <FormControlLabel
            control={<Checkbox color="error" />}
            label= {showButtons ? "High" : ""}
            checked={checkedHigh}
            onChange={handleCheckHighPriority}            
            sx={{
              color: red[800],
              "&.Mui-checked": {
                color: red[600]
              }
            }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label={showButtons ? "Medium" : ""}
            checked={checkedMedium}
            onChange={handleCheckMediumPriority}            
            sx={{
              color: blue[800],
              "&.Mui-checked": {
                color: blue[600]
              },
              "&.MuiCheckbox-colorPrimary": {
                color: blue[600]
              }
            }}
          />
          <FormControlLabel
            control={<Checkbox color="success" />}
            label={showButtons ? "Low" : ""}
            checked={checkedLow}
            onChange={handleCheckLowPriority}            
            sx={{
              color: green[800],
              "&.Mui-checked": {
                color: green[600]
              }
            }}
          />
        </FormGroup>        
        </ThemeProvider>
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
