import React from 'react';

import DialogModal from "./DialogModal";

import WarningIcon from "@mui/icons-material/Warning";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DeleteButton = ({onClick}) => {
    return <IconButton onClick={onClick}>
        <DeleteIcon sx={{color: '#910000'}}/>
    </IconButton>
}

const EditButton = ({onClick}) => {
    return <IconButton onClick={onClick}>
        <EditIcon sx={{color: '#9fa72a'}}/>
    </IconButton>
}

const useColumns = (open, handleOpenModal, onEdit, onDelete) => {

    return [
        {
            field: 'importance',
            headerName: 'Importance',
            type: 'number',
            width: 110,
            editable: true,
            align: 'center',
            renderCell: ({row: {importance}}) => {
                return (
                    <>
                        {importance &&
                            <WarningIcon sx={{color: '#9fa72a'}}/>
                        }
                    </>
                )
            }
        },
        {
            field: 'task',
            headerName: 'Todo',
            sortable: false,
            width: 160,

        },
        {
            headerName: 'User',
            field: 'responsible',
            width: 150,
            editable: true,
        },
        {
            field: 'dueDt',
            headerName: 'Due Date',
            width: 150,
            editable: false,
        },
        {
            field: 'createDt',
            headerName: 'Create Date',
            valueGetter: ({value}) => new Date(value).toLocaleDateString('en-CA'),
            width: 150,
            editable: false,
        },
        {
            field: 'editDt',
            headerName: 'Edit Date',
            valueGetter: ({value}) => value ? new Date(value).toLocaleDateString('en-CA') : '',
            width: 150,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: ({row}) => {
                return (
                    <>
                        <DeleteButton onClick={() => onDelete(row.id)}/>
                        <DialogModal
                            open={open}
                            todo={row}
                            onClose={handleOpenModal}
                            InitButton={EditButton}
                            onEdit={onEdit}
                        />
                    </>
                )
            }
        },
    ];
};

export default useColumns;