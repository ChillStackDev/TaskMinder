
import { useEffect, useState } from 'react';




function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    completed: false,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
    
  }, []);


  const fetchTasks = async () => {
    console.log('Fetching tasks...');
    let response = await fetch('http://127.0.0.1:8000/apito/task-list/');
    let data =await response.json()
    console.log(data)
    setTodoList(data)

  }

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log('Name', name);
    console.log('Value', value);
    setActiveItem({
      ...activeItem,
      title: value
    });
  }


const handleSubmit = (e) => {
  e.preventDefault();
  console.log(activeItem);

  var url = 'http://127.0.0.1:8000/apito/task-create/';

  if (editing === true){
    url = `http://127.0.0.1:8000/apito/task-update/${activeItem.id}/`
    setEditing(false);

  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(activeItem)
  })
    .then((response) => {
      fetchTasks();
      setActiveItem({
        id: null,
        title: '',
        completed: false
      });
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};


const startEdit=(task)=>{
  setEditing(true)
  setActiveItem(task)
}

const deleteItem = (task) => {
  fetch(`http://127.0.0.1:8000/apito/task-delete/${task.id}/`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      fetchTasks(); 
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}


const strikeUnstrike = (task)=>{
  const updatedTask = {
    ...task,
    completed: !task.completed,
  };
  
  var url = `http://127.0.0.1:8000/apito/task-update/${task.id}/`

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  }).then(()=>{
    fetchTasks()
  })
 
}




  return (
    <div className='container dark'>
        
        <div id="task-container">
            <div className='app-header'>
                <h1>All TODO's</h1>
            
            </div>
          <div id="form-wrapper">
          
            <form onSubmit={handleSubmit} id="form">

              <div className="flex-wrapper">
                <div style={{flex:6}}>
                <input onChange={handleChange} value={activeItem.title} className='form-control' type="text" name="title" id="title" placeholder='Add task' />
                </div>
                <div style={{flex:1}}>
                  <input type="submit" className="btn btn-warning" id='submit' name='Add' />
                </div>
              </div>
            </form>
  
          </div> 

          <div className='notes-list1'>
                {todoList.map((task, index) => (
                    <div key={index} className='task-wrapper flex-wrapper'>
                      <div onClick={() => strikeUnstrike(task)} style={{flex:5}}>
                        {task.completed === false ? (
                        <span>{task.title}</span>)
                        :(  <strike>{task.title}</strike>
                          )}
                      </div>

                      <div  style={{flex:1}}>
                      <button onClick={() => startEdit(task)} className='btn btn-sm btn-outline-info'>EDIT</button>

                      </div>

                      <div  style={{flex:1}}>
                      <button onClick={()=> deleteItem(task)} className='btn btn-sm btn-outline-dark delete'>-</button>
                      </div>

                    </div>
                ))}
          </div>
         
        </div>   
    </div>
  );
}

export default Todo;
