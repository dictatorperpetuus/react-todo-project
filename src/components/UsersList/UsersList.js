import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

const UserNonEditable = ({ user, onDelete, onEdit }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {user.name}

      <Box sx={{ display: "flex" }}>
        <IconButton onClick={() => onEdit(user.id)}>
          <SaveAltIcon sx={{ color: "#e5b436" }} />
        </IconButton>

        <IconButton onClick={onDelete(user.id)}>
          <DeleteIcon sx={{ color: "#910000" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const UserEditable = ({ user, onCancel, onSave }) => {
  const [newUser, setNewUser] = useState(user);

  const handleChangeUserName = (e) => {
    setNewUser((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const handleSaveEvent = () => {
    onSave(newUser);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        sx={{ width: "40%" }}
        value={newUser.name}
        onChange={handleChangeUserName}
        variant="outlined"
        size="small"
      />

      <Box sx={{ display: "flex" }}>
        <IconButton onClick={handleSaveEvent}>
          <EditIcon sx={{ color: "#e5b436" }} />
        </IconButton>

        <IconButton onClick={onCancel}>
          <DeleteIcon sx={{ color: "#910000" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const UsersList = ({ usersList, setUsersList }) => {
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleClickOpen = () => {
    setOpen((open) => !open);
  };

  const deleteUser = (id) => () => {
    const newUsersList = usersList.filter((user) => user.id !== id);
    setUsersList(newUsersList);

    localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE_USERS,
      JSON.stringify(newUsersList)
    );
  };

  const handleUserEdit = (newUser) => {
    const newUsersList = usersList.map((user) => {
      if (user.id !== newUser.id) return user;

      return newUser;
    });
    setUsersList(newUsersList);
    localStorage.setItem(
      process.env.REACT_APP_LOCAL_STORAGE_USERS,
      JSON.stringify(newUsersList)
    );
    setEditUser(null);
  };

  return (
    <>
      <Box>
        <Button onClick={handleClickOpen}>All Users</Button>
        <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClickOpen}>
          <DialogTitle>All Users List</DialogTitle>
          <DialogContent>
            <Box>
              {usersList.map((user) => (
                <div key={user.id}>
                  {user.id === editUser ? (
                    <UserEditable
                      onSave={handleUserEdit}
                      user={user}
                      onCancel={() => setEditUser(null)}
                    />
                  ) : (
                    <UserNonEditable
                      user={user}
                      onDelete={deleteUser}
                      onEdit={setEditUser}
                    />
                  )}
                </div>
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default UsersList;
