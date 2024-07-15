import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import {MainContent, MainLayout} from './styles/Layouts'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income'
import Expenses from './components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import StockData from './components/StockData/StockData';

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Income />
      case 3:
        return <Expenses />
      case 4: 
        return <StockData />
      default: 
        return <Dashboard />
    }
  }



  return (
      <AppStyled className="App">
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <MainContent>
            {displayData()}
          </MainContent>
        </MainLayout>
      </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: black;
  position: relative;

  main {
    flex: 1;
    background: white;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;