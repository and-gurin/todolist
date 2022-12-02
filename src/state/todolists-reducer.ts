import {FilterIsDoneType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTitleTodoListActionType |
    ChangeFilterTodoListActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTitleTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeFilterTodoListActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterIsDoneType
}

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType>=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(item => item.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(item => item.id === action.id ? {...item, title: action.title} : item)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(item => item.id === action.id ? {...item, filter: action.filter} : item)
        }

        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodoListAC = ( title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const ChangeTitleTodoListAC = ( id: string, title: string): ChangeTitleTodoListActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id,title: title}
}

export const ChangeFilterTodoListAC = ( id: string, filter: FilterIsDoneType): ChangeFilterTodoListActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
