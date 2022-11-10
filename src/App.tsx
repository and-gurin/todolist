import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterIsDoneType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'What to buy', isDone: true},
        {id: v1(), title: 'What to learn', isDone: false},
        {id: v1(), title: 'What to create', isDone: true},
        {id: v1(), title: 'What to fuck', isDone: true},
        {id: v1(), title: 'What to build', isDone: true}
    ])
    let [filter, setFilter] = useState('all')

    const DeleteTask = (id:string) => {
         tasks = tasks.filter((item)=>item.id !== id)
        setTasks(tasks)
    }
    const TasksFilter = (isDone: FilterIsDoneType) => {
        setFilter(isDone)
    }
    let taskForTodoList = tasks;

    if(filter === 'active'){
        taskForTodoList = tasks.filter((item)=>!item.isDone)
    }

    if(filter === 'completed'){
        taskForTodoList = tasks.filter((item)=>item.isDone)
    }

    const addTask = (title: string) => {
      const newTask = {id: v1(), title: title, isDone: false};
      const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const changeTaskStatus = (id: string, isDone: boolean)=>{
        let changedTask =  tasks.find((t)=>t.id === id)
        if(changedTask){
            changedTask.isDone = isDone;
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <TodoList
                addTask={addTask}
                deleteTask={DeleteTask}
                tasksFilter={TasksFilter}
                tasks={taskForTodoList}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
                title={'What to learn'}/>
        </div>
    );
}

export default App;
