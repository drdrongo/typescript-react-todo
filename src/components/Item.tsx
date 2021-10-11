import React, { useRef, useState, useCallback, } from 'react'

interface TodoItem {
    id: number;
    title: string;
    isComplete: boolean;
}

type Props = {
    save: React.FocusEventHandler<HTMLInputElement>;
    todo: TodoItem;
    id: number;
    title: string;
    isComplete: boolean;
    toggleComplete: React.MouseEventHandler;
    removeItem: Function;
}

let interval: number;
let counter: number = 0;

function Item({ save, todo, toggleComplete, removeItem }: Props) {
    const { title, isComplete } = todo;

    const inputRef = useRef<HTMLInputElement>(null)
    
    const [titleValue, setTitleValue] = useState(title);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
        todo.title = e.target.value;
    };

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            if (titleValue.length > 0) {
                const node = inputRef.current;
                if (node) node.blur();
            }
        }
    }, [titleValue, inputRef]);

    
    const handleMouseDown = useCallback(e => {
        interval = window.setInterval(() => {
            if (counter >= 50) {
                removeItem();
                clearInterval(interval);
                counter = 0;
            }
            counter++;
        }, 10);
    }, [removeItem]);

    const handleMouseUp = useCallback(e => {
        if (interval && counter < 50) {
            clearInterval(interval);
            counter = 0;
        }
    }, [])

    return (
        <li className="min-h-[3rem] flex border-l border-r border-t last:border-b border-gray-200 border-solid">
            <div className="py-2 w-12 flex justify-center items-center self-start flex-shrink-0">
                <button
                    className={`w-8 h-8 ${isComplete ? 'bg-blue-200' : 'bg-gray-200'} rounded-md`}
                    type="button"
                    onClick={toggleComplete}
                >
                    {isComplete && '✔️'}
                </button>
            </div>
            <div className="p-1 flex border-l border-gray-200 items-center flex-grow overflow-auto">
                <input
                    ref={inputRef}
                    type="text"
                    value={titleValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onBlur={save}
                    className={`p-1 text-left h-full w-full text-gray-600 ${isComplete ? "line-through text-opacity-50" : ""}`}
                />
            </div>
            <div className="py-2 self-start flex-shrink-0 overflow-hidden group w-12 flex-grow-0 flex items-center justify-center">
                <button
                    className="transform transition-transform translate-x-16 w-8 h-8 bg-gray-100 hover:bg-gray-300 rounded-md group-hover:translate-x-0"
                    type="button"
                    // onClick={removeItem}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    ✖️
                </button>
            </div>
        </li>
    )
}

export default Item
