import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    id:string
    addItemCallback:(title: string, id:string)=>void
}

export const AddItemForm = (props:AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string|null>(null)

    const addItem = () => {
        if(title.trim()!==''){
            props.addItemCallback(title.trim(), props.id);
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
            addItem()
        }
    }

    return(
        <div>
            <div>
                <input value={title}
                       className={error?'error':''}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addItem}>+</button>
            </div>
            {error && <div className='error-message'>{error}</div>}
        </div>

    )
}
