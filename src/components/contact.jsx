import React, { useState } from 'react';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import '../styles/contact.css';
import Input from './input';
import { db } from './firebase';
import {collection, addDoc} from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';


const Contact = () => {
  const [newMessage, setNewMessage] = useState({})
  const [saving, setSaving] = useState(false)

  const handleInput = (e) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value
    })
  }
  
  const saveMessage = async (e) => {
    try {
      e.preventDefault()
    setSaving(true)
    await addDoc(collection(db, 'messages'), newMessage)
    setSaving(false)
    toast.success('Successfully Sended')
    } catch (error){
      toast.error("This didn't work.")
    }
  }

  
  return (
    <form className='form' >
      <h1>Contact Form <MarkunreadIcon /></h1>
      <Toaster />

      <Input className='space'
        label='Name'
        id='name'
        type='text'
        handleInput={(e)=>handleInput(e)}/>

      <Input className='space'
         label='Email'
         id='email'
         type='Email'
         handleInput={(e)=>handleInput(e)}/>

      
      <label>Message</label>
      <textarea 
        name='message'
        id='message'
        placeholder='Message'
        onChange={(e)=>handleInput(e)} />
      <button onClick={(e)=>saveMessage(e)} disabled={saving}>Submit Message</button>
    </form>
  )
}

export default Contact