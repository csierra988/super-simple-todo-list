import { Route, Routes } from 'react-router-dom';
import './App.css';
import ToDoPage from './pages/ToDoPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RequireAuth from './auth/RequireAuth';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RequireAuth/>}>
            <Route path="/todo" element={<ToDoPage />} />
            <Route path="/" element={<ToDoPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
