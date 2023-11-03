import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NotePage = () => {
  const navigate = useNavigate();
  let { id }= useParams()
  console.log(id)

  let [note,setNote]=useState(null)

  useEffect(()=>{
    getNoteid()
    // eslint-disable-next-line
  },[])

  let getNoteid =  async ()=>{
    if (id==='new'){
      return 
    }
    let response  = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
    let data = await response.json()
    console.log("Note:id",data)

    setNote(data)
  }
  
  let createNote = async ()=>{
    fetch(`http://127.0.0.1:8000/api/create/`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note)
    })
  }

  let updateNoteid = async ()=>{
    fetch(`http://127.0.0.1:8000/api/update/${id}/`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note)
    })
  }

  let deleteNoteid = async ()=>{
    fetch(`http://127.0.0.1:8000/api/delete/${id}/`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    })
    navigate("/")
  }

  let handleSubmit = ()=>{
    if(id!=='new' && !note.body && !note.title){
      deleteNoteid()
    }
    else if(id !=='new'){
    updateNoteid()
    }
    else if(id==='new' && note!==null){
      createNote()
    }
    navigate("/")
    
  }
  return (
    <div className='note'>
      <div className='note-header'>

        <h3 onClick={handleSubmit}>👈</h3>
        {id !== 'new' ? (<button onClick={deleteNoteid}>Delete</button>)
        :(<button onClick={handleSubmit} >Done</button>)}
        
      </div> 
 
         <textarea className='title'  cols="30" rows="1" placeholder="Title" defaultValue={note?.title} onChange={(e)=>{setNote({...note,'title':e.target.value})}}></textarea>
         <textarea cols="30" rows="10" placeholder='Body' defaultValue={note?.body} onChange={(e)=>{setNote({...note,'body':e.target.value})}}></textarea>

    </div>
  )
}

export default NotePage