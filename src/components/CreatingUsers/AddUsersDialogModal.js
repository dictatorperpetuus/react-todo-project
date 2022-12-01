import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddUsersDialogModal = ({ InitButton }) => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState("");

  const setAndSaveUsers = (newUser) => {
    const userList = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_USERS)
    );
    if (userList) {
      return localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE_USERS,
        JSON.stringify([...userList, newUser])
      );
    }
    return localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE_USERS,
      JSON.stringify([newUser])
    );
  };

  const handleClickOpen = () => {
    setOpen((open) => !open);
  };

  const addUser = () => {
    const item = {
      id: uuidv4(),
      name: newUser,
    };
    setAndSaveUsers(item);
    setNewUser("");
  };

  return (
    <Box>
      <Button
        sx={{ alignItems: "center", display: "flex", float: "right" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", padding: "10px 0" }}>
            <TextField
              sx={{ width: "100%", mb: 2 }}
              label="User"
              type="text"
              variant="outlined"
              onChange={(e) => setNewUser(e.target.value)}
              value={newUser}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addUser()} type="submit" variant="outlined">
            Add
          </Button>
          <Button onClick={handleClickOpen} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddUsersDialogModal;
