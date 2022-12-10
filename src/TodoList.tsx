import React, { useCallback} from "react";
import {FilterIsDoneType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import { Delete} from '@mui/icons-material'
import {TaskStateType} from "./AppWithRedux";
import {Tasks} from "./Tasks.";


type PropsType = {
    id: string
    title: string
    tasks: TaskStateType
    deleteTask:(id:string, todoListId: string)=>void
    TodoListsFilter: (isDone: FilterIsDoneType, todoListId:string)=>void
    addTask:(title: string, todoListId: string)=>void
    changeTaskStatus:(id:string, isDone: boolean, todoListId: string)=> void
    filter: string
    removeTodoList:(todoListId: string)=>void
    editTaskTitle:(id:string, title: string, todoListId: string)=> void
    editTodoListTitle: (title: string, todoListId: string)=> void
}


export const TodoList = React.memo((props: PropsType) => {

    const addTask = useCallback ((tittle: string) => {
        props.addTask(tittle, props.id)
    },[props.addTask, props.id])

    const onAllClickHandler = useCallback (() => {
        props.TodoListsFilter('all', props.id)
    },[props.TodoListsFilter, props.id]);

    const onActiveClickHandler = useCallback (() => {
        props.TodoListsFilter('active', props.id)
    }, [props.TodoListsFilter, props.id]);

    const onCompletedClickHandler = useCallback (() => {
        props.TodoListsFilter('completed', props.id)
    },[props.TodoListsFilter, props.id] );

    const deleteTodoList = () => {
        props.removeTodoList(props.id)
    }

    const editTodoListTitle = useCallback (() => {
        props.editTodoListTitle( props.title, props.id)
    },[props.editTodoListTitle, props.title, props.id])

    let taskForTodoList = props.tasks[props.id];

    if (props.filter === 'active') {
        taskForTodoList = props.tasks[props.id].filter((item) => !item.isDone)
    }

    if (props.filter === 'completed') {
        taskForTodoList = props.tasks[props.id].filter((item) => item.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={editTodoListTitle}/>
                <IconButton onClick={deleteTodoList} size="small">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm  addItemCallback={addTask}/>
            <div>
                {taskForTodoList.map((item)=>{

                    return (
                        <Tasks key={item.id}
                               deleteTask={props.deleteTask}
                               editTaskTitle={props.editTaskTitle}
                               changeTaskStatus={props.changeTaskStatus}
                               id={props.id}
                               tasks={item} />
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
})