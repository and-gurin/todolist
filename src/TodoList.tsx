import React from "react";
import {FilterIsDoneType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    DeleteTask:(id:number)=>void
    TasksFilter: (isDone: FilterIsDoneType)=>void
}

export function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((item)=>{
                    return (
                        <li key={item.id}>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={()=>props.DeleteTask(item.id)}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>props.TasksFilter('all')}>All</button>
                <button onClick={()=>props.TasksFilter('active')}>Active</button>
                <button onClick={()=>props.TasksFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}