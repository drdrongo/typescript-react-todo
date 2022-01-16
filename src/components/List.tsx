import React, { useCallback, useState, useEffect } from 'react'
import Item from './Item';
import Input from './Input';

type Props = {
    title: string;
};

interface TodoItem {
    id: number;
    title: string;
    isComplete: boolean;
}

function List({ title }: Props) {
    const [todos, setTodos] = useState<Array<TodoItem>>([]);

    const fetchFromStorage = useCallback(() => {
        const data: string = localStorage.getItem('todos') || '[]';
        setTodos(JSON.parse(data));
    }, [setTodos]);

    useEffect(() => {
        fetchFromStorage();
    }, [fetchFromStorage])

    const saveToStorage = useCallback((todos) => {
        setTodos([...todos]);
        const json: string = JSON.stringify(todos);
        localStorage.setItem('todos', json);
    }, [setTodos]);

    const createTodo = useCallback((newItem) => {
        const newTodos: TodoItem[] = [newItem, ...todos];
        saveToStorage(newTodos);
    }, [todos, saveToStorage])

    const findIdxById = useCallback((id: number) => {
        const idx: number = todos.findIndex(todo => todo.id === id);
        return idx;
    }, [todos]);

    const toggleComplete = useCallback((id: number) => {
        const idx: number = findIdxById(id);
        if (idx < 0) return;

        const item = todos[idx];
        item.isComplete = !item.isComplete;
        if (item.isComplete) {
            todos.splice(idx, 1);
            todos.push(item);
        } else {
            todos.splice(idx, 1);
            todos.unshift(item);
        }
        saveToStorage(todos);
    }, [todos, saveToStorage, findIdxById]);
    
    const removeItem = useCallback((id: number) => {
        const idx: number = findIdxById(id);
        console.log({idx})
        if (idx < 0) return;

        todos.splice(idx, 1);
        saveToStorage(todos);
    }, [todos, saveToStorage, findIdxById]);

    return (
        <div className="list-outer ml-20 mr-20 ">
            <h1>{title}</h1>
            <Input createTodo={createTodo} />
            {todos.map(todo => {
                const { id, title, isComplete } = todo;
                return <Item
                    save={() => saveToStorage(todos)}
                    todo={todo}
                    toggleComplete={() => toggleComplete(id)}
                    removeItem={() => removeItem(id)}
                    key={id}
                    id={id}
                    title={title}
                    isComplete={isComplete}
                />
            })}
        </div>
    );
}

export default List
