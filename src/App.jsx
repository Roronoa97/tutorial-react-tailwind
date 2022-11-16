import { Route, Routes } from 'react-router-dom';
import './css/style.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
