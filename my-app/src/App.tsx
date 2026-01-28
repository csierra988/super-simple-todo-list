import './App.css';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="grid grid-cols-1 grid-rows-1">
            <p className='text-center'>My </p>
            <p className='text-center pb-6'>TO DO LIST</p>
            <ToDoList />
        </div>
      </div>
    </>
  )
}

export default App
