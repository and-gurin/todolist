import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


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

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to buy', filter: 'all'},
        {id: todoListId2, title: 'What to learn', filter: 'all'},
    ])

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter((item) => item.id !== todoListId));
        delete tasks[todoListId]
    }

    const addTodoList = (title: string, id: string) => {
        const newTodoList = {id: id, title: title, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [id]: []})
    }

    const editTodoListTitle = (title: string, todoListId: string) => {
        let todoList = todoLists.find((t) => t.id === todoListId);
        if (todoList) {
            todoList.title = title
        }
        setTodoLists([...todoLists])
    }

    const TodoListsFilter = (isDone: FilterIsDoneType, todoListId: string) => {
        let todoList = todoLists.find((t) => t.id === todoListId);
        if (todoList) {
            todoList.filter = isDone;
        }
        setTodoLists([...todoLists])
    }

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let tasksForTodolist = tasks[todoListId]
        tasks[todoListId] = tasksForTodolist.filter((item) => item.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todoListId] = [newTask, ...tasks[todoListId]];
        setTasks({...tasks});
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        let task = tasks[todoListId].find((t) => t.id === id)
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks})
    }

    const editTaskTitle = (id: string, title: string, todoListId: string) => {
        let task = tasks[todoListId].find((t) => t.id === id)
        if (task) {
            task.title = title;
        }
        setTasks({...tasks})
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
                    <AddItemForm id={v1()} addItemCallback={addTodoList}/>
                </Grid>
                <Grid container>
                    {todoLists.map((item) => {
                        let taskForTodoList = tasks[item.id];

                        if (item.filter === 'active') {
                            taskForTodoList = tasks[item.id].filter((item) => !item.isDone)
                        }

                        if (item.filter === 'completed') {
                            taskForTodoList = tasks[item.id].filter((item) => item.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding:"10px"}}>
                                    <TodoList
                                        key={item.id}
                                        id={item.id}
                                        addTask={addTask}
                                        deleteTask={DeleteTask}
                                        TodoListsFilter={TodoListsFilter}
                                        tasks={taskForTodoList}
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

export default App;
