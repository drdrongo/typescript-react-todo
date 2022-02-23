import { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/theme_context';

function ThemeButton() {
  const { isLight, theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(isLight);
  }, [isLight])

  return (
			<button
        className={`flex align-center w-8 h-5 bg-red-600`}
        onClick={() => toggleTheme()}
      >
        <div
          className={`rounded-br-full bg-blue-500 w-5 h-5 flex items-center justify-center ${isLight ? 'mr-auto ml-0' : 'ml-auto mr-0'}`}
        >
          {isLight ? '☀️' : '🌛'}
        </div>
      </button>
  )
}

export default ThemeButton;