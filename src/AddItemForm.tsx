import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    id: string
    addItemCallback: (title: string, id: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItemCallback(title.trim(), props.id);
            setTitle('')

        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setTitle(value)
        setError(null)
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
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>

    )
}
