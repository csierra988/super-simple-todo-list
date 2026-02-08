import { Route, Routes } from 'react-router-dom';
import './App.css';
import ToDoPage from './pages/ToDoPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="/" element={<ToDoPage />} />
      </Routes>
    </>
  )
}

export default App
