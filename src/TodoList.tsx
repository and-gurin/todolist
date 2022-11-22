import React, {ChangeEvent} from "react";
import {FilterIsDoneType, TaskType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan";

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
    editTaskTitle:(id:string, title: string, todoListId: string)=> void
    editTodoListTitle: (title: string, todoListId: string)=> void
}

export function TodoList(props: PropsType) {

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
    const editTodoListTitle = () => {
        props.editTodoListTitle( props.title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={editTodoListTitle}/>
                <button onClick={deleteTodoList}>✖</button>
            </h3>
            <AddItemForm id={props.id} addItemCallback={props.addTask}/>
            <ul>
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
                        <li className={item.isDone?'isDone':''} key={item.id}>
                            <input type="checkbox" onChange={newIsDoneValue} checked={item.isDone}/>
                            <EditableSpan title={item.title} onChange={editTaskTitle}/>
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