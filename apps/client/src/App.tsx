import { useEffect, useState } from 'react'
import './App.css'
import ImageUpload from './ImageUpload';

function App() {
 const [greeting,setGreeting] = useState('');
 useEffect(() => {
   fetch('/api').then((res)=>res.text()).then(
     setGreeting
   )},[])
   

  return (
    <>
   {greeting}
   <ImageUpload/>
    </>
  )
}

export default App
