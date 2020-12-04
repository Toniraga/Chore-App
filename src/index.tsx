import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

type FormEv = React.FormEvent<HTMLElement>

interface ITodo {
    text: string,
    complete: boolean
}

const App = (): JSX.Element => {
    const [value, setValue] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = (e: FormEv): void => {
        e.preventDefault();
        setValue('')
    }

    const addTodo = (text: string) => {
        const newTodos: ITodo[] = [...todos, { text, complete: false }]
        setTodos(newTodos)
    }

    return (
        <Fragment>
            <h1> To Do List </h1>
            <form onSubmit={handleSubmit}>
                <input type='text' required value={value} onChange={e => setValue(e.target.value)} />
                <button type='submit'> Add Todo </button>
            </form>
        </Fragment>
    )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
