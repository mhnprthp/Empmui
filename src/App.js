import './App.css';
import Dashboard from './component/Dashboard';
import CreateEmployee from './component/CreateEmployee';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Dashboard></Dashboard>}> </Route>
      <Route path='/create' element ={<CreateEmployee></CreateEmployee>}> 
      </Route>
    </Routes>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </BrowserRouter>
    </div>
  );
}

export default App;
