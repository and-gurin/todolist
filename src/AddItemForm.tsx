import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItemCallback: (title: string) => void
}

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
    console.log("Add item form called")
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItemCallback(title.trim());
            setTitle('')

        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
        const value = e.currentTarget.value;
        setTitle(value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <div>
                <TextField value={title} variant="outlined" size="small"
                           error={!!error}
                           label="Title"
                           helperText={error}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}/>
                <IconButton  color="primary" onClick={addItem}>
                    <AddBox/>
                </IconButton>
            </div>
        </div>

    )
})
