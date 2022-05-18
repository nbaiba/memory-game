import './App.css';
import styled from 'styled-components'
import Game from './components/Game'


function App() {
  return (
    <AppContainer>
      <Game />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ee964b;
  height: 100vh;
`