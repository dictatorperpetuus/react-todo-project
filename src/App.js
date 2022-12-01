import React from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { Box } from "@mui/material";

function App() {
  return (
    <Box>
      <Header />
      <TodoList />
    </Box>
  );
}

export default App;
