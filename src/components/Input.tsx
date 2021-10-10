import React, { useState, useCallback } from 'react'

type Props = {
    createTodo: Function
};

interface TodoItem {
    id: number;
    title: string;
    isComplete: boolean;
}

function Input({ createTodo }: Props) {
    const [inputValue, setInputValue] = useState('');
    const generateId = useCallback(() => Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), []);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.length > 0) {
            const newItem: TodoItem = {
                id: generateId(), 
                title: inputValue,
                isComplete: false
            };
            createTodo(newItem);
            setInputValue('');
        }
    }, [inputValue, generateId, createTodo]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    return (
        <div className="w-full min-h-[3rem] flex py-2">
            <input
                className="w-full pl-2 pr-2 border border-solid border-gray-200"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                value={inputValue}
            />
        </div>
    )
}

export default Input
