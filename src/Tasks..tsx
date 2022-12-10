import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder, Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    id: string
    tasks: TaskType
    deleteTask:(id:string, todoListId: string)=>void
    changeTaskStatus:(id:string, isDone: boolean, todoListId: string)=> void
    editTaskTitle:(id:string, title: string, todoListId: string)=> void
}

export const Tasks = React.memo((props:TaskPropsType) => {
    const deleteTask = useCallback (() => {
        props.deleteTask(props.tasks.id, props.id)
    }, [props.tasks.id, props.id])
    const newIsDoneValue = (e:ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.checked;
        props.changeTaskStatus(props.tasks.id, newValue, props.id)
    }
    const editTaskTitle = () => {
        props.editTaskTitle(props.tasks.id, props.tasks.title, props.id)
    }
    return (
        <div className={props.tasks.isDone?'isDone':''} key={props.tasks.id}>
            <Checkbox color="primary"
                      onChange={newIsDoneValue}
                      icon={<BookmarkBorder />} checkedIcon={<Bookmark  />}
                      checked={props.tasks.isDone}/>
            <EditableSpan title={props.tasks.title} onChange={editTaskTitle}/>
            <IconButton onClick={deleteTask}  size="small">
                <Delete/>
            </IconButton>
        </div>
    )}
)