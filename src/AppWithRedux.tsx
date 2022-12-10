import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodoListAC,
    ChangeFilterTodoListAC,
    ChangeTitleTodoListAC,
    RemoveTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterIsDoneType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: string
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    /*let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoList] = useReducer(todoListReducer ,[
        {id: todoListId1, title: 'What to buy', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'},
    ])*/

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state=>state.todoLists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state=>state.tasks);
    const dispatch = useDispatch();

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }

    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [])

    const editTodoListTitle = useCallback((title: string, todoListId: string) => {
        const action = ChangeTitleTodoListAC(todoListId, title)
        dispatch(action)
    }, [])

    const TodoListsFilter = useCallback ((isDone: FilterIsDoneType, todoListId: string) => {
        const action = ChangeFilterTodoListAC(todoListId, isDone)
        dispatch(action)
    }, [])

    const DeleteTask = useCallback((id: string, todoListId: string) => {
        const action = RemoveTaskAC(id, todoListId)
        dispatch(action)
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [])

    const changeTaskStatus = useCallback ((id: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(isDone, id, todoListId)
        dispatch(action)
    }, [])

    const editTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
        const action = changeTaskTitleAC(title, id, todoListId)
        dispatch(action)
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItemCallback={addTodoList}/>
                </Grid>
                <Grid container>
                    {todoLists.map((item) => {

                        return (
                            <Grid item>
                                <Paper style={{padding:"10px"}}>
                                    <TodoList
                                        key={item.id}
                                        id={item.id}
                                        addTask={addTask}
                                        deleteTask={DeleteTask}
                                        TodoListsFilter={TodoListsFilter}
                                        tasks={tasks}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodoList={removeTodoList}
                                        filter={item.filter}
                                        editTaskTitle={editTaskTitle}
                                        editTodoListTitle={editTodoListTitle}
                                        title={item.title}/>
                                </Paper>
                            </Grid>
                            )
                    })}
                </Grid>

            </Container>

        </div>
    );
}

