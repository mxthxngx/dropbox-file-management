import { useEffect, useState } from 'react'
import './App.css'

function App() {
 const [greeting,setGreeting] = useState('');
 useEffect(() => {
   fetch('/api').then((res)=>res.text()).then(
     setGreeting
   )})
   

  return (
    <>
   {greeting}
    </>
  )
}

export default App
