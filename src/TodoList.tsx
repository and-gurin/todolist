import React, {ChangeEvent, useState} from "react";
import {FilterIsDoneType, TaskType} from "./App";
import './App.css';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask:(id:string, todoListId: string)=>void
    tasksFilter: (isDone: FilterIsDoneType, todoListId:string)=>void
    addTask:(title: string, todoListId: string)=>void
    changeTaskStatus:(id:string, isDone: boolean, todoListId: string)=> void
    filter: string
    removeTodoList:(todoListId: string)=>void
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if(title.trim()!==''){
            props.addTask(title.trim(), props.id);
            setTitle('')

        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setTitle(value)
        setError(null)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.tasksFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.tasksFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.tasksFilter('completed', props.id)
    }
    const deleteTodoList = () => {
        props.removeTodoList(props.id)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={deleteTodoList}>✖</button>
            </h3>
            <div>
                <input value={title}
                       className={error?'error':''}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className='error-message'>{error}</div>}
            <ul>
                {props.tasks.map((item)=>{
                    const deleteTask = () => {
                        props.deleteTask(item.id, props.id)
                    }
                    const newIsDoneValue = (e:ChangeEvent<HTMLInputElement>) => {
                        const newValue = e.currentTarget.checked;
                        props.changeTaskStatus(item.id, newValue, props.id)
                    }
                    return (
                        <li className={item.isDone?'isDone':''} key={item.id}>
                            <input type="checkbox" onChange={newIsDoneValue} checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={deleteTask}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all'? 'active-filter':''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active'? 'active-filter':''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? 'active-filter':''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}