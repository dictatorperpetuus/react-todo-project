import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Container from "../Container";
import { DataGrid } from "@mui/x-data-grid";
import DialogModal from "../AddTodo/DialogModal";
import useColumns from "../AddTodo/useColumns";
import AddUsersDialogModal from "../CreatingUsers/AddUsersDialogModal";
import UsersList from "../UsersList/UsersList";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

const AddUser = ({ onClick }) => {
  return <Button onClick={onClick}>+ User</Button>;
};

const AddButton = ({ onClick }) => {
  return <Button onClick={onClick}>+ Task</Button>;
};

const UsersListButton = ({ onClick }) => {
  return <Button onClick={onClick}>Users List</Button>;
};

const TodoList = () => {
  const [item, setItem] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const loadSavedUsers = () => {
    const loadUsers = localStorage.getItem(
      process.env.REACT_APP_LOCAL_STORAGE_USERS
    );
    if (loadUsers) {
      setUsersList(JSON.parse(loadUsers));
    }
  };

  useEffect(() => {
    loadSavedUsers();
  }, []);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setItem(JSON.parse(saved));
    }
  }

  //For rendering all tasks
  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTaskAndSave(newTasks) {
    setItem(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  const deleteTodo = (id) => {
    const newTodo = item.filter((item) => item.id !== id);
    setTaskAndSave(newTodo);
  };

  const editTodo = (task) => {
    const filteredList = item.filter((item) => item.id !== task.id);
    setTaskAndSave([...filteredList, task]);
  };

  const addTodo = (task) => {
    setTaskAndSave([...item, task]);
  };

  const columns = useColumns(editTodo, deleteTodo);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogModal InitButton={AddButton} onCreate={addTodo} />
        <AddUsersDialogModal InitButton={AddUser} onCreate={loadSavedUsers} />
        <UsersList
          InitButton={UsersListButton}
          usersList={usersList}
          setUsersList={setUsersList}
        />
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={item}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default TodoList;
