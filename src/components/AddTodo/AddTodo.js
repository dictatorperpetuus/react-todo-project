import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import * as uuid from "uuid";
import Container from "../Container";

const AddTodo = ({todo, setTodo}) => {

    const [value, setValue] = useState('')

    const saveTodo = (id) => {
        setTodo([...todo, {
            id: uuid.v4(),
            title: value,
            status: true
        }])
        setValue('')
    }

    return (
        <Container sx={{pb: 5}}>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <TextField sx={{width: '80%'}} id="outlined-basic" label="Add your todo..."
                           variant="outlined"
                           placeholder='Add a tsk...' value={value}
                           onChange={(e) => setValue(e.target.value)}/>
                <Button sx={{
                    height: '56px',
                    marginLeft: ' 5px',
                    color: 'teal',
                    width: '20%'
                }}
                        variant="outlined"
                        onClick={saveTodo}>Save</Button>
            </Box>
        </Container>
    );
};

export default AddTodo;