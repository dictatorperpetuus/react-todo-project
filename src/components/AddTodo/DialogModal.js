import React, { useEffect, useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';


import {
    Box,
    Button,
    Dialog,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,

} from "@mui/material";


const initState = {
    id: null,
    task: '',
    importance: false,
    responsible: '',
    dueDt: '',
    createDt: null,
    editDt: null
}

const DialogModal = ({
                         InitButton,
                         todo = null,
                         onEdit = null,
                         onCreate = null,
                         open = false,
                         onClose
                     }) => {



    const [task, setTask] = useState({})

    const handleChangeEvent = (key) => (e) => {
        const value = e.target.value

        setTask(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleCheckedEvent = (key) => (e) => {
        const value = e.target.checked

        setTask(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleSubmitEvent = () => {
        onClose()
        if (todo) return onEdit({...task, editDt: Date.now()})
        onCreate({...task, createDt: Date.now(), id: uuidv4()})
        setTask(() => ({...initState}))
    }


    useEffect(() => {
        if (todo) {
            setTask(todo)
        } else {
            setTask(() => ({...initState}))
        }
    }, [open])

    return (
        <>
            <InitButton onClick={onClose}/>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{width: '100%', padding: '10px 0'}}
                    >
                        <TextField
                            sx={{width: '100%', mb: 2}}
                            label='Todo'
                            variant='outlined'
                            onChange={handleChangeEvent('task')}
                            value={task.task}
                        />
                        <TextField
                            sx={{width: '100%', mb: 2}}
                            label='User name'
                            variant='outlined'
                            onChange={handleChangeEvent('responsible')}
                            value={task.responsible}
                        />
                        <TextField
                            sx={{width: '100%', mb: 2}}
                            label='Due Date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type='date'
                            variant='outlined'
                            onChange={handleChangeEvent('dueDt')}
                            value={task.dueDt}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={task.importance}
                                    onChange={handleCheckedEvent('importance')}
                                />
                        }

                            label="Important"
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='outlined' color='primary' onClick={handleSubmitEvent
                    }>Add</Button>
                    <Button variant='outlined' color='primary' onClick={onClose}>Close</Button>
                </DialogActions>


            </Dialog>
        </>

    )
        ;
};

export default DialogModal;