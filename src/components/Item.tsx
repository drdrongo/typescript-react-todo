import React, { useState, useCallback, } from 'react'

type Props = {
    id: number;
    title: string;
    isComplete: boolean;
    toggleComplete: React.MouseEventHandler;
    removeItem: React.MouseEventHandler;
}

function Item({ id, title, isComplete, toggleComplete, removeItem }: Props) {
    const [titleValue, setTitleValue] = useState(title);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    };

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (titleValue.length > 0) {

            }
        }
    }, []);

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
            <div className="pl-4 px-2 flex border-l border-gray-200 items-center flex-grow overflow-auto">
                <input
                    type="text"
                    value={titleValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className={`text-left h-full text-gray-600 ${isComplete ? "line-through text-opacity-50" : ""}`}
                />
            </div>
            <div className="py-2 self-start flex-shrink-0 overflow-hidden group w-12 flex-grow-0 flex items-center justify-center">
                <button
                    className="transform transition-transform translate-x-16 w-8 h-8 bg-gray-100 hover:bg-gray-300 rounded-md group-hover:translate-x-0"
                    type="button"
                    onClick={removeItem}
                >
                    ✖️
                </button>
            </div>
        </li>
    )
}

export default Item
