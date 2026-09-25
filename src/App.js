import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

// Material UI COMPONENTS 
import Container from '@mui/material/Container';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM',
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}></ThemeProvider>
    </div>
  );
}

export default App;
