import React, {ChangeEvent} from "react";
import {FilterIsDoneType, TaskType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder, Delete} from '@mui/icons-material'


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask:(id:string, todoListId: string)=>void
    TodoListsFilter: (isDone: FilterIsDoneType, todoListId:string)=>void
    addTask:(title: string, todoListId: string)=>void
    changeTaskStatus:(id:string, isDone: boolean, todoListId: string)=> void
    filter: string
    removeTodoList:(todoListId: string)=>void
    editTaskTitle:(id:string, title: string, todoListId: string)=> void
    editTodoListTitle: (title: string, todoListId: string)=> void
}


export function TodoList(props: PropsType) {

    const onAllClickHandler = () => {
        props.TodoListsFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.TodoListsFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.TodoListsFilter('completed', props.id)
    }
    const deleteTodoList = () => {
        props.removeTodoList(props.id)
    }
    const editTodoListTitle = () => {
        props.editTodoListTitle( props.title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={editTodoListTitle}/>
                <IconButton onClick={deleteTodoList} size="small">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm id={props.id} addItemCallback={props.addTask}/>
            <div>
                {props.tasks.map((item)=>{
                    const deleteTask = () => {
                        props.deleteTask(item.id, props.id)
                    }
                    const newIsDoneValue = (e:ChangeEvent<HTMLInputElement>) => {
                        const newValue = e.currentTarget.checked;
                        props.changeTaskStatus(item.id, newValue, props.id)
                    }
                    const editTaskTitle = () => {
                        props.editTaskTitle(item.id, item.title, props.id)
                    }
                    return (
                        <div className={item.isDone?'isDone':''} key={item.id}>
                            <Checkbox color="primary"
                                      onChange={newIsDoneValue}
                                      icon={<BookmarkBorder />} checkedIcon={<Bookmark  />}
                                      checked={item.isDone}/>
                            <EditableSpan title={item.title} onChange={editTaskTitle}/>
                            <IconButton onClick={deleteTask}  size="small">
                                <Delete/>
                            </IconButton>
                            {/*<button onClick={deleteTask}>✖</button>*/}
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter === 'all'? 'outlined':'text'}
                        color="primary"
                        size="small"
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active'? 'outlined':'text'}
                        color="secondary"
                        size="small"
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed'? 'outlined':'text'}
                        color="success"
                        size="small"
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}