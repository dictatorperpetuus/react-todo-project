import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AddUsersSelectField = ({ onChange, value }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const users = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_USERS)
    );
    if (users) {
      setUserList(users);
    }
  }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          sx={{ width: "100%", mb: 2 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Users"
          onChange={onChange}
        >
          {userList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default AddUsersSelectField;
