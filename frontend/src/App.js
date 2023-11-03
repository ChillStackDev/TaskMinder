import './App.css';
import Todo from './Todo';
import Switch from './components/Switch';
import Header from './components/header'
import NotePage from './pages/NotePage';
import NotesListPge from './pages/NotesListPge';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
      <div>
        
       

      
    <Router>
           
            <div className='container dark'>
              <div className='app'>
              
             

              <Header />
              <Routes>
                <Route path="/" element={<NotesListPge />} />
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/todo" element={<Todo/>} />


              </Routes>

              <Switch/>
              </div>
              
            </div>
    </Router>
        


      </div>
       


  );
}

export default App;
