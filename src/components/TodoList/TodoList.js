import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Container from "../Container";
import { DataGrid } from "@mui/x-data-grid";
import DialogModal from "../AddTodo/DialogModal";
import useColumns from "../AddTodo/useColumns";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

const AddButton = ({ onClick }) => {
  return <Button onClick={onClick}>+ Task</Button>;
};

const TodoList = () => {
  const [todo, setTodo] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTodo(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTaskAndSave(newTasks) {
    setTodo(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  const deleteTodo = (id) => {
    const newTodo = todo.filter((item) => item.id !== id);
    setTaskAndSave(newTodo);
  };

  const editTodo = (task) => {
    const filteredList = todo.filter((item) => item.id !== task.id);
    setTaskAndSave([...filteredList, task]);
  };

  const addTodo = (task) => {
    setTaskAndSave([...todo, task]);
  };

  const columns = useColumns(editTodo, deleteTodo);

  return (
    <Container>
      <DialogModal InitButton={AddButton} onCreate={addTodo} />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={todo}
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
