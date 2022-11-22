import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title:string
    onChange: (newValue: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [newValue, setNewValue] = useState<string>(props.title);
    const [editMode, setEditMode ] = useState(false);


    const oneChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setEditMode(false)
            props.onChange(newValue)
        }
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(newValue)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setNewValue(props.title)
    }

    return (
        <>
            {editMode ?
                <input value={newValue} type="text"
                       onChange={oneChangeHandler}
                       autoFocus
                       onBlur={activateViewMode}
                       onKeyPress={onKeyPressHandler}
                />:
                <span onClick={activateEditMode}>{newValue}</span>}
        </>
    )
}