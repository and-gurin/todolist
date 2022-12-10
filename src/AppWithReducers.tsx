import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodoListAC,
    ChangeFilterTodoListAC,
    ChangeTitleTodoListAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";


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

export function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoList] = useReducer(todoListReducer ,[
        {id: todoListId1, title: 'What to buy', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'},
    ])

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

    const editTodoListTitle = (title: string, todoListId: string) => {
        const action = ChangeTitleTodoListAC(todoListId, title)
        dispatchToTodoList(action)
    }

    const TodoListsFilter = (isDone: FilterIsDoneType, todoListId: string) => {
        const action = ChangeFilterTodoListAC(todoListId, isDone)
        dispatchToTodoList(action)
    }

    let [tasks, dispatchToTask] = useReducer( tasksReducer,{
            [todoListId1]: [
                {id: v1(), title: 'FreeCodeCamp es6', isDone: true},
                {id: v1(), title: 'FreeCodeCamp data structure', isDone: false},
                {id: v1(), title: 'HTML tags', isDone: true},
            ],
            [todoListId2]: [
                {id: v1(), title: 'Ignat Home Work ', isDone: true},
                {id: v1(), title: 'Lessons TodoList', isDone: true}
            ]
        }
    )

    const DeleteTask = (id: string, todoListId: string) => {
        const action = RemoveTaskAC(id, todoListId)
        dispatchToTask(action)
    }

    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatchToTask(action)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(isDone, id, todoListId)
        dispatchToTask(action)
    }

    const editTaskTitle = (id: string, title: string, todoListId: string) => {
        const action = changeTaskTitleAC(title, id, todoListId)
        dispatchToTask(action)
    }

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

