import React, {ChangeEvent, useState} from "react";
import {FilterIsDoneType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask:(id:string)=>void
    tasksFilter: (isDone: FilterIsDoneType)=>void
    addTask:(title: string)=>void
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState('');
    const addTask = () => {
        props.addTask(title);
        setTitle('')
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setTitle(value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.tasksFilter('all')
    }
    const onActiveClickHandler = () => {
        props.tasksFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.tasksFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((item)=>{
                    const deleteTask = () => {
                        props.deleteTask(item.id)
                    }
                    return (
                        <li key={item.id}>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={deleteTask}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}