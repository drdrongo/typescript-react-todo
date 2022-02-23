import './App.css';
import List from './components/List';
import Header from './components/header';
import { CSSProperties } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './contexts/theme_context';
function App() {
	const { theme } = useContext(ThemeContext);

	const styles = {
    backgroundColor: theme.background,
    color: theme.foreground,
	} as CSSProperties;

  return (
      <div className="App" style={styles}>
        <Header />
        <List title="Hayato's Todo List"/>
        {`Theme is: ${theme.foreground}`}
      </div>
  );
}

export default App;
