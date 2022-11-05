import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterIsDoneType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'What to buy', isDone: true},
        {id: 2, title: 'What to learn', isDone: false},
        {id: 3, title: 'What to create', isDone: true},
        {id: 4, title: 'What to fuck', isDone: true},
        {id: 5, title: 'What to build', isDone: true}
    ])
    let [filter, setFilter] = useState('completed')

    const DeleteTask = (id:number) => {
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

    return (
        <div className="App">
            <TodoList
                DeleteTask={DeleteTask}
                TasksFilter={TasksFilter}
                tasks={taskForTodoList}
                title={'What to learn'}/>
        </div>
    );
}

export default App;
