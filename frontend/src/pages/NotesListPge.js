import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';




const NotesListPge = () => {
    
    let [notes,setNotes] = useState([]);


    useEffect(() => {
       getNotes()
    }, []);

    let getNotes = async ()=>{
 
        let response = await fetch('http://127.0.0.1:8000/api/notes/');

        let data = await response.json()

        console.log(data)

        setNotes(data)


        
    }


    let getTime =(note)=>{
      return new Date(note.updated).toLocaleDateString()
    }
    let getContent = (note)=>{
     if (note.body){
      let content = note.body.replaceAll('\n','')
      if (content.length >45){
         return content.slice(0,45)+'....'
      }
      else{
         return content
      }
    }}

  return (
      <div className='notes'>
            <div className='notes-header'>
                  <h2 className='notes-title'>&#9782; Notes</h2>
                  <p className='notes-count'>{notes.length}</p>
            </div>
         
            <div className='notes-list'>
                     {notes.map((note,index)=>(
                        <Link to={`/note/${note.id}`}>
                           <div className='notes-list-item'>
                              <h1 key={index}>{note.title}</h1>
                              <p><span>{getTime(note)}</span>{getContent(note)}</p>
                           </div>
                        </Link>
                              ))}
            </div>
            <Link to="/note/new" className='floating-button'>
              <h1>&#10133;</h1>
            </Link>
      </div>

  )
}

export default NotesListPge