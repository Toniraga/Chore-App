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
        addTodo(value)
        setValue('')
    }

    const addTodo = (text: string): void => {
        const newTodos: ITodo[] = [...todos, { text, complete: false }]
        setTodos(newTodos)
    }

    const completeTodo = (index: number): void => {
        const newTodods: ITodo[] = [ ...todos]
        newTodods[index].complete = !newTodods[index].complete
        setTodos(newTodods)
    }

    const completeAll = (): void => {
        const newTodos: ITodo[] = [...todos]
        newTodos.forEach(todo => {
            todo.complete = true
        })
    }

    const removeTodo = (index: number): void => {
        const newTodos: ITodo[] = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <h1> To Do List </h1>
            <form onSubmit={handleSubmit}>
                <input type='text' required value={value} onChange={e => setValue(e.target.value)} />
                <button type='submit'> Add Todo </button>
            </form>
            <section>
                {todos.map((todo: ITodo, index: number) => (
                    <Fragment key={index}>
                        <div style={{textDecoration: todo.complete ? 'line-through' :  '' }}> {todo.text} </div>
                        <button type='button' onClick={() => completeTodo(index)}> {todo.complete ? 'Incomplete' : 'Complete'} </button>
                        <button type='button' onClick={() => removeTodo(index)}> x </button> 
                    </Fragment>
                ))}
            </section>
        </Fragment>
    )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)
