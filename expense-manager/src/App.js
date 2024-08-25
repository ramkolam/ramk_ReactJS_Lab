import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowData from './components/ShowData';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowData></ShowData>}></Route>
          <Route path='/add' element={<ExpenseTracker></ExpenseTracker>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;